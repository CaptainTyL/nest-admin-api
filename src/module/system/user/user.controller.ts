import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto';

@Controller('system/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * 用户--创建
   */
  @Post('/')
  @HttpCode(200)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }
  /**
   * 用户--列表
   */
  // @Get('/list')
  // findAll(@Query() query: ListUserDto) {}

  /**
   * 用户--详情
   */

  /**
   * 用户--更新
   */

  /**
   * 用户--删除
   */
}
