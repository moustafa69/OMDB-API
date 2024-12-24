import { IsOptional, IsString } from 'class-validator';

export class MovieSearchParamDto {
  @IsString()
  @IsOptional()
  search?: string;
}
