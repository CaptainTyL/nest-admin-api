import { Global, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SysUserEntity } from './entities/user.entity';
import { SysUserWithPostEntity } from './entities/user-with-post.entity';
import { SysUserWithRoleEntity } from './entities/user-with-role.entity';
import { SysDeptEntity } from '../dept/entities/dept.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Global()
@Module({
  imports: [
    TypeOrmModule.forFeature([
      SysUserEntity,
      SysUserWithPostEntity,
      SysUserWithRoleEntity,
      SysDeptEntity,
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (config: ConfigService) => ({
        secret: config.get('jwt.secretKey'),
        signOptions: {
          expiresIn: `${config.get('jwt.expiresIn')}s`,
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
