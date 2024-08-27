import { ListRoleDto, UpdateRoleDto } from './dto/index';
import {
  Body,
  Controller,
  HttpCode,
  Post,
  Query,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { CreateRoleDto } from './dto';

@Controller('system/role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  /**
   * 角色创建
   */
  @Post('/')
  @HttpCode(200)
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.create(createRoleDto);
  }

  /**
   * 角色列表查询
   */
  @Get('/list')
  findAll(@Query() query: ListRoleDto) {
    return this.roleService.findAll(query);
  }
  /**
   * 角色详情
   */
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roleService.findOne(+id);
  }

  /**
   * 角色更新
   */
  @Put()
  update(@Body() updateRoleDto: UpdateRoleDto) {
    return this.roleService.update(updateRoleDto);
  }

  /**
   * 角色删除
   */
  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    const roleIds = ids.split(',').map((id) => +id);
    return this.roleService.remove(roleIds);
  }
}
