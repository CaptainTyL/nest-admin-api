import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  IsEnum,
} from 'class-validator';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export enum MenuTypeEnum {
  M = 'M',
  C = 'C',
  F = 'F',
}

export class CreateMenuDto {
  @IsNotEmpty({ message: '请输入菜单名称' })
  @IsString()
  @Length(0, 50)
  menuName: string;

  @IsOptional()
  @IsNumber()
  parentId: number;

  @IsOptional()
  @IsNumber()
  orderNum: number;

  @IsNotEmpty({ message: '请输入菜单路径' })
  @IsString()
  @IsOptional()
  @Length(0, 200)
  path?: string;

  @IsOptional()
  @IsString()
  @Length(0, 200)
  query?: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  component?: string;

  @IsOptional()
  @IsString()
  @Length(0, 100)
  icon?: string;

  @IsString()
  @IsEnum(MenuTypeEnum)
  @IsNotEmpty({ message: '请选择菜单类型' })
  menuType: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  isCache: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  isFrame: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  visible: string;

  @IsOptional()
  @IsString()
  perms: string;
}

export class ListMenuDto {
  @IsOptional()
  @IsString()
  menuName?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateMenuDto extends CreateMenuDto {
  @IsNotEmpty({ message: '请输入菜单ID' })
  @IsNumber()
  menuId: number;
}
