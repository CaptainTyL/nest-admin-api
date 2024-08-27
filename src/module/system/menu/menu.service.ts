import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysMenuEntity } from './entities/menu.entity';
import { Repository } from 'typeorm';
import { CreateMenuDto, ListMenuDto, UpdateMenuDto } from './dto';
import { ResultData } from 'src/common/utils/result';
import { ListToTree } from 'src/common/utils';

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(SysMenuEntity)
    private readonly menuRepository: Repository<SysMenuEntity>,
  ) {}

  /**
   * 新增菜单
   * @param createMenuDto
   * @returns
   */
  async create(createMenuDto: CreateMenuDto) {
    await this.menuRepository.save(createMenuDto);
    return ResultData.ok();
  }

  /**
   * 查询菜单列表
   */
  async findAll(query: ListMenuDto) {
    const entity = this.menuRepository.createQueryBuilder('entity');
    entity.where('entity.delFlag=:delFlag', { delFlag: '0' });
    if (query.menuName) {
      entity.andWhere(`entity.menuName LIKE "%${query.menuName}%"`);
    }
    if (query.status) {
      entity.andWhere(`entity.status=:status`, { status: query.status });
    }
    const res = await entity.getMany();
    return ResultData.ok(res);
  }

  /**
   * 查询菜单详情
   */
  async findOne(menuId: number) {
    const res = await this.menuRepository.findOne({
      where: { menuId, delFlag: '0' },
    });
    return ResultData.ok(res);
  }

  /**
   * 更新菜单
   */
  async update(updateMenuDto: UpdateMenuDto) {
    await this.menuRepository.update(
      { menuId: updateMenuDto.menuId },
      updateMenuDto,
    );
    return ResultData.ok();
  }

  /**
   * 菜单删除
   */
  async remove(menuId: number) {
    await this.menuRepository.update({ menuId }, { delFlag: '1' });
    return ResultData.ok();
  }

  /**
   * 列表查询-树表
   */
  async treeList(query: ListMenuDto) {
    const entity = this.menuRepository.createQueryBuilder('entity');
    entity.where('entity.delFlag=:delFlag', { delFlag: '0' });
    if (query.menuName) {
      entity.andWhere(`entity.menuName LIKE "%${query.menuName}%"`);
    }
    if (query.status) {
      entity.andWhere(`entity.status=:status`, { status: query.status });
    }
    const res = await entity.getMany();

    // 组装树列表数据
    const tree = ListToTree(
      res,
      (m) => m.menuId,
      (m) => m.menuName,
    );
    return ResultData.ok(tree);
  }
}
