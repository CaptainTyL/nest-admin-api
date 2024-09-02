import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SysPostEntity } from './entities/post.entity';
import { Repository, In, FindManyOptions } from 'typeorm';
import { CreatePostDto, ListPostDto, UpdatePostDto } from './dto';
import { ResultData } from 'src/common/utils/result';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(SysPostEntity)
    private readonly sysPostEntityRep: Repository<SysPostEntity>,
  ) {}

  async create(createPostDto: CreatePostDto) {
    await this.sysPostEntityRep.save(createPostDto);
    return ResultData.ok();
  }

  async findAll(query: ListPostDto) {
    const entity = this.sysPostEntityRep.createQueryBuilder('entity');
    entity.where('entity.delFlag = :delFlag', { delFlag: '0' });
    if (query.postName) {
      entity.andWhere(`entity.postName LIKE "%${query.postName}%"`);
    }
    if (query.postCode) {
      entity.andWhere(`entity.postCode LIKE "%${query.postCode}%"`);
    }
    if (query.status) {
      entity.andWhere('entity.status = :status', { status: query.status });
    }
    if (query.pageSize && query.pageNum) {
      entity.skip(query.pageSize * (query.pageNum - 1)).take(query.pageSize);
    }
    const [list, total] = await entity.getManyAndCount();
    return ResultData.ok({ list, total });
  }

  async findOne(postId: number) {
    const data = await this.sysPostEntityRep.findOne({
      where: { postId, delFlag: '0' },
    });
    return ResultData.ok(data);
  }

  async update(updatePostDto: UpdatePostDto) {
    const res = await this.sysPostEntityRep.update(
      { postId: updatePostDto.postId },
      updatePostDto,
    );
    return ResultData.ok(res);
  }

  async remove(postIds: number[]) {
    await this.sysPostEntityRep.update(
      { postId: In(postIds) },
      { delFlag: '1' },
    );
    return ResultData.ok();
  }

  async findPosts(where: FindManyOptions<SysPostEntity>) {
    return await this.sysPostEntityRep.find(where);
  }
}
