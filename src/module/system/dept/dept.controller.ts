import {
  Controller,
  HttpCode,
  Post,
  Body,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { DeptService } from './dept.service';
import { CreateDeptDto, ListDeptDto, UpdateDeptDto } from './dto';

@Controller('system/dept')
export class DeptController {
  constructor(private readonly deptService: DeptService) {}

  // 部门管理-创建
  @Post()
  @HttpCode(200) // post请求成功响应默认状态码是201
  create(
    @Body()
    createDeptDto: CreateDeptDto,
  ) {
    return this.deptService.create(createDeptDto);
  }

  // 部门管理-列表-查询全部
  @Get('/list')
  findAll(@Query() query: ListDeptDto) {
    return this.deptService.findAll(query);
  }

  // 部门管理-详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.deptService.findOne(+id);
  }

  // 部门管理-更新
  @Put()
  update(@Body() updateDeptDto: UpdateDeptDto) {
    return this.deptService.update(updateDeptDto);
  }

  // 部门管理-删除
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deptService.remove(+id);
  }
}
