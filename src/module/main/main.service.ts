import { Injectable } from '@nestjs/common';
import { LoginDto, ClientInfoDto, RegisterDto } from './dto';
import { UserService } from '../system/user/user.service';

@Injectable()
export class MainService {
  constructor(private readonly userService: UserService) {}
  /**
   * 用户登录
   */
  async login(user: LoginDto, clientInfo: ClientInfoDto) {
    return await this.userService.login(user, clientInfo);
  }

  /**
   * 用户注册
   */
  async register(user: RegisterDto) {
    return this.userService.register(user);
  }
}
