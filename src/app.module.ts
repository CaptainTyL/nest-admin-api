import { Module, Global } from '@nestjs/common';

import configuration from './config/configuration';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { RedisModule } from './module/redis/redis.module';
import { RedisClientOptions } from '@liaoliaots/nestjs-redis';
import { MainModule } from './module/main/main.module';
import { PostModule } from './module/system/post/post.module';
import { DeptModule } from './module/system/dept/dept.module';
import { MenuModule } from './module/system/menu/menu.module';
import { RoleModule } from './module/system/role/role.module';
import { UserModule } from './module/system/user/user.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './common/guards/auth.guard';
import { AuthModule } from './module/system/auth/auth.module';

@Global()
@Module({
  imports: [
    // 配置模块
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
    }),
    // 数据库
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) =>
        ({
          type: 'mysql',
          entities: [`${__dirname}/**/*.entity{.ts,.js}`],
          autoLoadEntities: true,
          keepConnectionAlive: true,
          timezone: '+08:00',
          ...config.get('db.mysql'),
        }) as TypeOrmModuleOptions,
      inject: [ConfigService],
    }),

    // redis
    RedisModule.forRootAsyc({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => {
        return {
          closeClient: true,
          readyLog: true,
          errorLog: true,
          config: config.get<RedisClientOptions>('redis'),
        };
      },
      inject: [ConfigService],
    }),

    MainModule,
    PostModule,
    DeptModule,
    MenuModule,
    RoleModule,
    UserModule,
    AuthModule,
  ],

  // 全局引入token验证守卫
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
