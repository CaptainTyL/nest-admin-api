import { IsNotEmpty, IsOptional, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsOptional()
  @IsString()
  code?: string;

  @IsNotEmpty({ message: '请输入用户名' })
  @IsString()
  @Length(2, 10)
  username: string;

  @IsNotEmpty({ message: '请输入登录密码' })
  @IsString()
  @Length(5, 20)
  password: string;

  @IsOptional()
  @IsString()
  uuid?: string;
}

export class ClientInfoDto {
  userAgent: string;
  ipaddr: string;
  browser: string;
  os: string;
  loginLocation: string;
}

export class RegisterDto extends LoginDto {}
