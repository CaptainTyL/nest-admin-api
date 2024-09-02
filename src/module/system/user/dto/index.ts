import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  //   IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export enum SexEnum {
  STATIC = '0',
  DYNAMIC = '1',
  UNKNOWN = '2',
}
// 创建用户DTO
export class CreateUserDto {
  @IsNotEmpty({ message: '请输入用户昵称' })
  @IsString()
  @Length(0, 30)
  nickName: string;

  @IsNotEmpty({ message: '请输入用户名称' })
  @IsString()
  @Length(0, 30)
  userName: string;

  @IsOptional()
  @IsString()
  @IsEnum(SexEnum)
  sex?: string;

  @IsNotEmpty({ message: '请输入用户密码' })
  @IsString()
  @Length(0, 200)
  password: string;

  @IsOptional()
  @IsString()
  //   @IsPhoneNumber('CN')
  phonenumber?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  email?: string;

  @IsOptional()
  @IsNumber()
  deptId?: number;

  @IsOptional()
  @IsArray()
  postIds?: Array<number>;

  @IsOptional()
  @IsArray()
  roleIds: Array<number>;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;
}
