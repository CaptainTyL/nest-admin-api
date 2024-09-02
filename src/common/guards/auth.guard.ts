import {
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { pathToRegexp } from 'path-to-regexp';
import { UserService } from 'src/module/system/user/user.service';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private globalWhiteList = [];
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    private readonly config: ConfigService,
  ) {
    super();
    this.globalWhiteList = [].concat(
      this.config.get('perm.router.whitelist') || [],
    );
  }

  async canActivate(ctx: ExecutionContext): Promise<boolean> {
    const isInWhiteList = this.checkWhiteList(ctx);
    if (isInWhiteList) {
      return true;
    }
    const req = ctx.switchToHttp().getRequest();
    const accessToken = req.get('Authorization'); // 获取请求头中令牌参数
    if (!accessToken) {
      throw new ForbiddenException('token缺失，请重新登录');
    }
    // 解析token是否可用
    const atUserId = await this.userService.parseToken(accessToken);
    if (!atUserId) {
      throw new UnauthorizedException('当前登录已过期，请重新登录');
    }

    // 调用父类 AuthGuard('jwt') 的 canActivate进行后续操作
    return await this.activate(ctx);
  }

  async activate(ctx: ExecutionContext): Promise<boolean> {
    return super.canActivate(ctx) as Promise<boolean>;
  }

  // 检查接口路由是否位于白名单内
  checkWhiteList(ctx: ExecutionContext): boolean {
    const req = ctx.switchToHttp().getRequest();
    const i = this.globalWhiteList.findIndex((route) => {
      // 判断请求方法类型是否相同
      if (req.method.toUpperCase() === route.method.toUpperCase()) {
        // 对比url 使用路由转正则工具进行对比
        return !!pathToRegexp(route.path).exec(req.url);
      }
      return false;
    });
    // 在白名单内 则 进行下一步， i === -1 ，则不在白名单，需要 比对是否有当前接口权限
    return i > -1;
  }
}
