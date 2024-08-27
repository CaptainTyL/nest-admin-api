import {
  IsEnum,
  IsNotEmpty,
  isNumber,
  IsNumber,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import { PagingDto } from 'src/common/dto';

export enum StatusEnum {
  STATIC = '0',
  DYNAMIC = '1',
}

export class CreatePostDto {
  @IsNotEmpty({ message: '请输入岗位编码' })
  @IsString()
  @Length(0, 64)
  postCode: string;

  @IsNotEmpty({ message: '请输入岗位名称' })
  @IsString()
  @Length(0, 50)
  postName: string;

  @IsNotEmpty({ message: '请输入岗位排序' })
  @IsNumber()
  postSort?: number;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  remark?: string;
}

export class ListPostDto extends PagingDto {
  @IsOptional()
  @IsString()
  @Length(0, 64)
  postCode?: string;

  @IsOptional()
  @IsString()
  @Length(0, 50)
  postName?: string;

  @IsOptional()
  @IsString()
  @IsEnum(StatusEnum)
  status?: string;
}

export class UpdatePostDto extends CreatePostDto {
  @IsNumber()
  postId: number;
}
