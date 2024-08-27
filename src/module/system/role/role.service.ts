import { CreateRoleDto, ListRoleDto, UpdateRoleDto } from './dto/index';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysRoleEntity } from './entities/role.entity';
import { In, Repository } from 'typeorm';
import { SysRoleWithMenuEntity } from './entities/role-with-menu.entity';
import { ResultData } from 'src/common/utils/result';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(SysRoleEntity)
    private readonly sysRoleEntityRep: Repository<SysRoleEntity>,
    @InjectRepository(SysRoleWithMenuEntity)
    private readonly sysRoleWithMenuEntityRep: Repository<SysRoleWithMenuEntity>,
  ) {}

  /**
   * 新增角色
   */
  async create(createRoleDto: CreateRoleDto) {
    // 储存角色
    const res = await this.sysRoleEntityRep.save(createRoleDto);

    const entity = this.sysRoleWithMenuEntityRep.createQueryBuilder('entity');
    const values = createRoleDto.menuIds.map((id) => {
      return {
        roleId: res.roleId,
        menuId: id,
      };
    });
    // 储存角色菜单关系
    entity.insert().values(values).execute();
    return ResultData.ok();
  }

  /**
   * 查询角色列表
   */
  async findAll(query: ListRoleDto) {
    const entity = this.sysRoleEntityRep.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });

    if (query.roleName) {
      entity.andWhere(`entity.roleName LIKE '%${query.roleName}%'`);
    }
    if (query.roleKey) {
      entity.andWhere(`entity.roleKey LIKE '%${query.roleKey}%'`);
    }
    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }
    if (query.params?.beginTime && query.params?.endTime) {
      entity.andWhere('entity.createTime BETWEEN :start ANd :end', {
        start: query.params.beginTime,
        end: query.params.endTime,
      });
    }
    if (query.pageSize && query.pageNum) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    }

    const [list, total] = await entity.getManyAndCount();
    return ResultData.ok({
      list,
      total,
    });
  }

  /**
   * 角色详情
   */
  async findOne(roleId: number) {
    const res = this.sysRoleEntityRep.findOne({
      where: {
        roleId: roleId,
        delFlag: '0',
      },
    });
    return ResultData.ok(res);
  }

  /**
   * 角色更新
   */
  async update(updateRoleDto: UpdateRoleDto) {
    // 处理角色菜单关联表数据
    const hasId = this.sysRoleWithMenuEntityRep.findOne({
      where: {
        roleId: updateRoleDto.roleId,
      },
      select: ['roleId'],
    });
    if (hasId) {
      // 删除该角色和菜单的关联数据
      await this.sysRoleWithMenuEntityRep.delete({
        roleId: updateRoleDto.roleId,
      });
    }

    // 更新角色、以及菜单和角色之间的关联关系
    const entity = this.sysRoleWithMenuEntityRep.createQueryBuilder('entity');
    const values = updateRoleDto.menuIds.map((id) => ({
      menuId: id,
      roleId: updateRoleDto.roleId,
    }));
    entity.insert().values(values).execute();

    // 删除更新dto中menuIds的数据
    delete (updateRoleDto as any).menuIds;
    await this.sysRoleEntityRep.update(
      { roleId: updateRoleDto.roleId },
      updateRoleDto,
    );
    return ResultData.ok();
  }

  /**
   * 角色删除-支持批量
   */
  async remove(roleIds: number[]) {
    await this.sysRoleEntityRep.update(
      { roleId: In(roleIds) },
      {
        delFlag: '1',
      },
    );
    return ResultData.ok();
  }
}
