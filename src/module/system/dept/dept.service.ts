import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysDeptEntity } from './entities/dept.entity';
import { Repository } from 'typeorm';
import { CreateDeptDto, ListDeptDto, UpdateDeptDto } from './dto';
import { ResultData } from 'src/common/utils/result';

@Injectable()
export class DeptService {
  constructor(
    @InjectRepository(SysDeptEntity)
    private readonly sysDeptEntityRep: Repository<SysDeptEntity>,
  ) {}
  async create(createDeptDto: CreateDeptDto) {
    if (createDeptDto.parentId) {
      const parent = await this.sysDeptEntityRep.findOne({
        where: {
          deptId: createDeptDto.parentId,
          delFlag: '0',
        },
        select: ['ancestors'],
      });
      if (!parent) {
        // 提示父级不存在
        return ResultData.fail(500, '父级部门不存在');
      }
      const ancestors = parent.ancestors
        ? `${parent.ancestors},${createDeptDto.parentId}`
        : `${createDeptDto.parentId}`;
      Object.assign(createDeptDto, { ancestors: ancestors });
    }
    await this.sysDeptEntityRep.save(createDeptDto);
    return ResultData.ok();
  }

  async findAll(query: ListDeptDto) {
    const entity = this.sysDeptEntityRep.createQueryBuilder('entity'); // createQueryBuilder()参数为sql表别名
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });
    if (query.deptName) {
      entity.andWhere(`entity.deptName LIKE "%${query.deptName}%"`);
    }
    if (query.status) {
      entity.andWhere('entity.status=:status', { status: query.status });
    }
    const res = await entity.getMany();
    return ResultData.ok(res);
  }

  async findOne(deptId: number) {
    const data = await this.sysDeptEntityRep.findOne({
      where: {
        deptId,
        delFlag: '0',
      },
    });

    return ResultData.ok(data);
  }

  async update(updateDeptDto: UpdateDeptDto) {
    if (updateDeptDto.parentId && updateDeptDto.parentId !== 0) {
      const parent = await this.sysDeptEntityRep.findOne({
        where: {
          deptId: updateDeptDto.parentId,
          delFlag: '0',
        },
        select: ['ancestors'],
      });
      if (!parent) {
        return ResultData.fail(500, '父级部门不存在');
      }
      const ancestors = parent.ancestors
        ? `${parent.ancestors},${updateDeptDto.parentId}`
        : `${updateDeptDto.parentId}`;
      Object.assign(updateDeptDto, { ancestors: ancestors });
    }
    await this.sysDeptEntityRep.update(
      { deptId: updateDeptDto.deptId },
      updateDeptDto,
    );
    return ResultData.ok();
  }

  async remove(id: number) {
    await this.sysDeptEntityRep.update({ deptId: id }, { delFlag: '1' });
    return ResultData.ok();
  }
}
