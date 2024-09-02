import { DynamicModule, Global, Module } from '@nestjs/common';
import { RedisService } from './redis.service';
import {
  RedisModule as liaoliaoRedisModule,
  RedisModuleAsyncOptions,
} from '@liaoliaots/nestjs-redis';

// 二次封装RedisMoule后导出
@Global() // 声明为全局模块
@Module({
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {
  static forRoot(
    options: RedisModuleAsyncOptions,
    isGlobal = true,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [liaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisService],
      exports: [RedisService],
    };
  }

  static forRootAsyc(
    options: RedisModuleAsyncOptions,
    isGlobal = true,
  ): DynamicModule {
    return {
      module: RedisModule,
      imports: [liaoliaoRedisModule.forRootAsync(options, isGlobal)],
      providers: [RedisService],
      exports: [RedisService],
    };
  }
}
