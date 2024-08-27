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
import { PostService } from './post.service';
import { CreatePostDto, ListPostDto, UpdatePostDto } from './dto';

@Controller('system/post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  // 岗位管理-创建
  @Post('/')
  @HttpCode(200)
  create(@Body() createPostDto: CreatePostDto) {
    return this.postService.create(createPostDto);
  }

  // 岗位管理-查询列表
  @Get('/list')
  findAll(@Query() query: ListPostDto) {
    return this.postService.findAll(query);
  }

  // 岗位管理-详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
  // 岗位管理-更新
  @Put()
  update(@Body() updatePostDto: UpdatePostDto) {
    return this.postService.update(updatePostDto);
  }

  // 岗位管理-删除
  @Delete(':ids')
  remove(@Param('ids') ids: string) {
    const postIds = ids.split(',').map((id) => +id);
    return this.postService.remove(postIds);
  }
}
