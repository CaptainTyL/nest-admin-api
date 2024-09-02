import { Module } from '@nestjs/common';
import { AuthStrategy } from './auth.strategy';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  providers: [AuthStrategy],
  exports: [PassportModule],
})
export class AuthModule {}
