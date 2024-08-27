import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { SysMenuEntity } from './entities/menu.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SysMenuEntity])],
  controllers: [MenuController],
  providers: [MenuService],
})
export class MenuModule {}
