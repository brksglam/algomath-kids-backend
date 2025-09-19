import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsIn, IsInt, IsOptional, Max, Min } from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({ default: 1, minimum: 1 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({ default: 10, minimum: 1, maximum: 100 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({ enum: ['asc', 'desc'], default: 'desc' })
  @IsIn(['asc', 'desc'])
  @IsOptional()
  order?: 'asc' | 'desc' = 'desc';
}

export class PageMetaDto {
  constructor(init?: Partial<PageMetaDto>) {
    Object.assign(this, init);
  }

  @ApiPropertyOptional()
  readonly page?: number;

  @ApiPropertyOptional()
  readonly limit?: number;

  @ApiPropertyOptional()
  readonly totalItems?: number;

  @ApiPropertyOptional()
  readonly totalPages?: number;
}

export class PageDto<T> {
  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }

  readonly data: T[];
  readonly meta: PageMetaDto;
}


