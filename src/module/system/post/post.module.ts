import { Module, Global } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysPostEntity } from './entities/post.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([SysPostEntity])],
  controllers: [PostController],
  providers: [PostService],
  exports: [PostService],
})
export class PostModule {}
