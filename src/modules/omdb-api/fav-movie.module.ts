import { Module } from '@nestjs/common';
import { FavMovieService } from './fav-movie.service';
import { FavMovieController } from './fav-movie.controller';
import { MovieService } from '../movie-api/movie.service';
import { MovieModule } from '../movie-api/movie.module';

@Module({
  imports: [MovieModule],
  controllers: [FavMovieController],
  providers: [FavMovieService],
  exports: [FavMovieService],
})
export class FavMovieModule {}
