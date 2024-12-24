import { Module } from '@nestjs/common';
import { FavMovieService } from './fav-movie.service';
import { FavMovieController } from './fav-movie.controller';

@Module({
  imports: [],
  controllers: [FavMovieController],
  providers: [FavMovieService],
  exports: [FavMovieService],
})
export class FavMovieModule {}
