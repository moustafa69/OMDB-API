import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  VERSION_NEUTRAL,
} from '@nestjs/common';
import { FavMovieService } from './fav-movie.service';
import { MovieIdParamDto } from './dto/movieId-param.dto';
import { query } from 'express';
import { MovieSearchParamDto } from './dto/query-param.dto';
import { MovieService } from '../movie-api/movie.service';
import { ApiTags } from '@nestjs/swagger';

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
}
