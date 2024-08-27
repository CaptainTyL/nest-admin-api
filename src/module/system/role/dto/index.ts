import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  IsEnum,
  IsArray,
  IsBoolean,
} from 'class-validator';
import { PagingDto } from 'src/common/dto/index';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreateRoleDto {
  @IsNotEmpty({ message: '请输入角色名称' })
  @IsString()
  @Length(0, 30)
  roleName: string;

  @IsNotEmpty({ message: '请输入角色权限字符' })
  @IsString()
  @Length(0, 100)
  roleKey: string;

  @IsOptional()
  @IsNumber()
  roleSort?: number;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;

  @IsOptional()
  @IsArray()
  menuIds?: Array<number>;

  @IsOptional()
  @IsString()
  dataScope: string;

  @IsOptional()
  @IsBoolean()
  menuCheckStrictly?: boolean;
}

export class ListRoleDto extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 30)
  roleName?: string;

  @IsString()
  @IsOptional()
  @Length(0, 100)
  roleKey?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateRoleDto extends CreateRoleDto {
  @IsNumber()
  roleId: number;
}
