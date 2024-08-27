import {
  IsDateString,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class DateParamsDTO {
  @IsDateString()
  beginTime: string;

  @IsDateString()
  endTime: string;
}

/**
 * 分页DTO
 */

export class PagingDto {
  @IsNumberString()
  pageNum: number;

  @IsNumberString()
  pageSize: number;

  /**
   * 时间查询区间
   */
  @IsOptional()
  @IsObject()
  params?: DateParamsDTO;

  // 排序字段
  @IsString()
  @IsOptional()
  orderByColumn?: string;

  // 排序方式
  @IsString()
  @IsOptional()
  isAsc?: 'asc' | 'desc';
}
