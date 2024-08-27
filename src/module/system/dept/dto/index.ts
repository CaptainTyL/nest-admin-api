import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  Length,
  Min,
} from 'class-validator';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreateDeptDto {
  @IsNumber()
  @IsNotEmpty({ message: '请选择上级部门' })
  parentId: number;

  @IsString()
  @Length(0, 30)
  @IsNotEmpty({ message: '请输入部门名称' })
  deptName: string;

  @IsNumber()
  @Min(0)
  @IsNotEmpty({ message: '请输入显示排序' })
  orderNum: number;

  @IsString()
  @IsOptional()
  leader?: string;

  @IsString()
  @IsOptional()
  @IsPhoneNumber()
  phone?: string;

  @IsString()
  @IsOptional()
  @IsEmail()
  email?: string;

  @IsString()
  @IsOptional()
  @IsEnum(StatusEnum)
  status?: string;
}

export class ListDeptDto {
  @IsOptional()
  @IsString()
  deptName?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdateDeptDto extends CreateDeptDto {
  @IsNotEmpty({ message: '请传入更新的部门唯一标识' })
  @IsNumber()
  deptId: number;
}
