import {
  Body,
  Controller,
  HttpCode,
  Post,
  Get,
  Query,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto, ListMenuDto, UpdateMenuDto } from './dto';

@Controller('system/menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  /**
   *  菜单创建
   * @param createMenuDto
   */
  @Post('/')
  @HttpCode(200)
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }

  /**
   * 菜单列表查询
   */

  @Get('/list')
  findAll(@Query() query: ListMenuDto) {
    return this.menuService.findAll(query);
  }

  /**
   * 菜单列表---树表
   */
  @Get('/treeList')
  treeList(@Query() query: ListMenuDto) {
    return this.menuService.treeList(query);
  }

  /**
   * 菜单详情
   */

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuService.findOne(+id);
  }

  /**
   * 菜单更新
   */
  @Put()
  update(@Body() updateMenuDto: UpdateMenuDto) {
    return this.menuService.update(updateMenuDto);
  }

  /**
   * 菜单删除
   */
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuService.remove(+id);
  }
}
