import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysUserEntity } from './entities/user.entity';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto';
import { GetNowDate, Uniq, GenerateUUID } from 'src/common/utils/index';
import * as bcrypt from 'bcrypt';
import {
  SYS_USER_TYPE,
  LOGIN_TOKEN_EXPIRESIN,
} from 'src/common/constant/index';
import { SysUserWithRoleEntity } from './entities/user-with-role.entity';
import { SysUserWithPostEntity } from './entities/user-with-post.entity';
import { ResultData } from 'src/common/utils/result';
import { ClientInfoDto, LoginDto, RegisterDto } from 'src/module/main/dto';
import { DelFlagEnum, StatusEnum, CacheEnum } from 'src/common/enum/index';
import { SysDeptEntity } from '../dept/entities/dept.entity';
import { RoleService } from '../role/role.service';
import { PostService } from '../post/post.service';
import { JwtService } from '@nestjs/jwt';
import { RedisService } from '../../redis/redis.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(SysUserEntity)
    private readonly sysUserEntityRep: Repository<SysUserEntity>,
    @InjectRepository(SysUserWithRoleEntity)
    private readonly sysUserWithRoleEntityRep: Repository<SysUserWithRoleEntity>,
    @InjectRepository(SysUserWithPostEntity)
    private readonly sysUserWithPostEntityRep: Repository<SysUserWithPostEntity>,
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRep: Repository<SysDeptEntity>,
    private readonly roleService: RoleService,
    private readonly postService: PostService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  /**
   * 创建用户
   */
  async create(createUserDto: CreateUserDto) {
    const loginDate = GetNowDate();
    // 使用bcrypt 密码加密算法 对用户输入密码进行处理
    // 手动生成盐
    const salt = bcrypt.genSaltSync(10); // 参数为saltRounds
    if (createUserDto.password) {
      // 对密码进行加密
      createUserDto.password = await bcrypt.hashSync(
        createUserDto.password,
        salt,
      );
    }
    // 储存用户
    const res = await this.sysUserEntityRep.save({
      ...createUserDto,
      loginDate,
      userType: SYS_USER_TYPE.CUSTOM,
    });
    // 储存用户与角色关系信息
    const roleEntity =
      this.sysUserWithRoleEntityRep.createQueryBuilder('roleEntity');
    const roleValues = createUserDto.roleIds.map((id) => ({
      userId: res.userId,
      roleId: id,
    }));
    roleEntity.insert().values(roleValues).execute();

    // 储存用户与岗位的关系信息
    const postEntity =
      this.sysUserWithPostEntityRep.createQueryBuilder('postEntity');
    const postValues = createUserDto.postIds.map((id) => ({
      userId: res.userId,
      postId: id,
    }));
    postEntity.insert().values(postValues).execute();

    return ResultData.ok();
  }

  /**
   * 用户注册
   */
  async register(registerDto: RegisterDto) {
    // 判断是否有同名用户
    const checkUserNameUnique = await this.sysUserEntityRep.findOne({
      where: {
        userName: registerDto.username,
      },
      select: ['userName'],
    });
    if (checkUserNameUnique) {
      return ResultData.fail(
        500,
        `保存用户'${registerDto.username}'失败，注册账号已存在`,
      );
    }
    registerDto['userName'] = registerDto.username;
    registerDto['nickName'] = registerDto.username;
    const loginDate = GetNowDate();
    await this.sysUserEntityRep.save({ ...registerDto, loginDate });
    return ResultData.ok();
  }

  /**
   * 登录
   */
  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    // TODO:判断验证码校验开关是否开启-若开启进行验证码验证

    // 根据用户名在用户表中查找数据
    const data = await this.sysUserEntityRep.findOne({
      where: {
        userName: user.username,
      },
      select: ['userId', 'password'],
    });

    // 判断是否正确匹配用户以及使用bcrypt对比密码是否正确
    if (!(data && bcrypt.compareSync(user.password, data.password))) {
      return ResultData.fail(500, '账号或密码错误');
    }
    // 获取用户信息
    const userData = await this.getUserInfo(data.userId);
    if (userData.delFlag === DelFlagEnum.DELETE) {
      return ResultData.fail(500, '您已被禁用，如需正常使用请联系管理员');
    }
    if (userData.status === StatusEnum.STOP) {
      return ResultData.fail(500, `您已被停用，如需正常使用请联系管理员`);
    }
    console.log(data);
    console.log(GetNowDate());

    // 更新用户信息-最后登录时间
    const loginDate = GetNowDate();
    await this.sysUserEntityRep.update(
      { userId: data.userId },
      {
        loginDate,
      },
    );

    // 生成用户唯一标识
    const uuid = GenerateUUID();
    const token = this.createToken({ uuid: uuid, userId: userData.userId });
    // 获取权限列表
    const permissions = [];
    // 获取部门名称 更新至用户信息中
    const deptData = await this.sysDeptEntityRep.findOne({
      where: {
        deptId: userData.deptId,
      },
      select: ['deptName'],
    });
    userData['deptName'] = deptData.deptName || '';

    // 获取角色列表
    const roles = userData.roles.map((item) => item.roleKey);

    const metaData = {
      browser: clientInfo.browser,
      ipaddr: clientInfo.ipaddr,
      loginLocation: clientInfo.loginLocation,
      loginTime: loginDate,
      os: clientInfo.os,
      permissions: permissions,
      roles,
      token: uuid,
      user: userData,
      userId: userData.userId,
      username: userData.userName,
      deptId: userData.deptId,
    };

    // 设置redis缓存
    await this.redisService.set(
      `${CacheEnum.LOGIN_TOKEN_KEY}${uuid}`,
      metaData,
      LOGIN_TOKEN_EXPIRESIN,
    );

    // 前端处理header中token的时候 需要在token前加上 Bearar空格 后跟后端生成的token
    return ResultData.ok(
      {
        token,
      },
      '登录成功',
    );
  }

  /**
   * 获取用户信息
   */
  async getUserInfo(userId: number): Promise<
    {
      dept: SysDeptEntity;
      roles: Array<any>;
      posts: Array<any>;
    } & SysUserEntity
  > {
    const entity = this.sysUserEntityRep.createQueryBuilder('user');
    entity.where({
      userId,
      delFlag: DelFlagEnum.NORMAL,
    });

    //TODO: 联查部门详情
    entity.leftJoinAndMapOne(
      'user.dept',
      SysDeptEntity,
      'dept',
      'dept.deptId=user.deptId',
    );

    // 一个用户可以对应多个角色 和多个岗位
    // 获取该用户绑定的角色id数组
    const roleIds = await this.getRoleIds([userId]);
    const roles = await this.roleService.findRoles({
      where: {
        delFlag: DelFlagEnum.NORMAL,
        roleId: In(roleIds),
      },
    });
    // 获取用户绑定的岗位id数组
    const postIds = await this.getPostIds([userId]);
    const posts = await this.postService.findPosts({
      where: {
        delFlag: DelFlagEnum.NORMAL,
        postId: In(postIds),
      },
    });
    const data: any = await entity.getOne();
    data['roles'] = roles;
    data['posts'] = posts;
    return data;
  }

  /**
   * 获取角色Id列表
   */
  async getRoleIds(userIds: Array<number>) {
    const roleList = await this.sysUserWithRoleEntityRep.find({
      where: {
        userId: In(userIds),
      },
      select: ['roleId'],
    });
    const roleIds = roleList.map((item) => item.roleId);
    // 数组去重后返回
    return Uniq(roleIds);
  }
  /**
   * 获取岗位id列表
   */
  async getPostIds(userIds: Array<number>) {
    const postList = await this.sysUserWithPostEntityRep.find({
      where: {
        userId: In(userIds),
      },
      select: ['postId'],
    });
    const postIds = postList.map((item) => item.postId);
    return Uniq(postIds);
  }

  /**
   * 创建token
   * @param payload 数据声明
   * @returns
   */
  createToken(payload: { uuid: string; userId: number }): string {
    const accessToken = this.jwtService.sign(payload);
    return accessToken;
  }

  /**
   * 从令牌中获取数据声明
   */
  parseToken(token: string) {
    try {
      if (!token) {
        return null;
      }
      const payload = this.jwtService.verify(token.replace('Bearer ', ''));
      return payload;
    } catch (error) {
      return null;
    }
  }
}
