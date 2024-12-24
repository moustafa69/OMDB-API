import { IsString } from 'class-validator';

export class MovieIdParamDto {
  @IsString()
  movieId: string;
}
