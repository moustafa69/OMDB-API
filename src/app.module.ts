import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { MovieModule } from './modules/movie-api/movie.module';
import { FavMovieModule } from './modules/omdb-api/fav-movie.module';

@Module({
  imports: [
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    MovieModule,
    FavMovieModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
