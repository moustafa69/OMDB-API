import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MovieService } from './movie.service';

@Module({
  imports: [],
  providers: [MovieService],
  exports: [MovieService],
})
export class MovieModule {}
