import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { FavMovieService } from './fav-movie.service';
import { MovieSearchParamDto } from './dto/search-param.dto';
import { MovieService } from '../movie-api/movie.service';
import { ApiTags } from '@nestjs/swagger';
import { MovieIdParamDto } from './dto/movieId-param.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@ApiTags('favorite-movie')
@Controller({ path: 'movie/', version: VERSION_NEUTRAL })
export class FavMovieController {
  constructor(
    private favMovieService: FavMovieService,
    private movieService: MovieService,
  ) {}

  @Post('details')
  async getMovieDetails(@Body() body: MovieSearchParamDto) {
    const movies = await this.movieService.fetchMovieDetails(body);
    return { success: true, movies };
  }

  @Get('favorite')
  async getFavMovies() {
    const movies = await this.favMovieService.getFavMovies();
    return { success: true, movies };
  }

  @Post('favorite/:movieId')
  async saveFavMovie(@Param() param: MovieIdParamDto) {
    return this.favMovieService.saveFavMovie(param);
  }

  @Patch('favorite/:movieId')
  async updateFavMovie(
    @Param() param: MovieIdParamDto,
    @Body() updateFavoriteDto: UpdateMovieDto,
  ) {
    return this.favMovieService.updateFavMovie(param, updateFavoriteDto);
  }

  @Delete('favorite/:movieId')
  async deleteFavMovie(@Param() param: MovieIdParamDto) {
    await this.favMovieService.deleteFavMovie(param);
    return {
      message: 'Favorite movie deleted successfully',
    };
  }
}
