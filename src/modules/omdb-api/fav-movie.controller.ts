import { Controller, Get, Param } from '@nestjs/common';
import { FavMovieService } from './fav-movie.service';
import { MovieIdParamDto } from './dto/movieIdParam.dto';

@Controller()
export class FavMovieController {
  constructor(private favMovieService: FavMovieService) {}

  @Get()
  async getMovieDetails(@Param() param: MovieIdParamDto) {
    // const movie = await this.favMovieService.getMovieDetails(param);
  }
}
