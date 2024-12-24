import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Favorite } from '@prisma/client';
import { MovieIdParamDto } from './dto/movieId-param.dto';
import { MovieService } from '../movie-api/movie.service';
import { UpdateMovieDto } from './dto/update-movie.dto';
@Injectable()
export class FavMovieService {
  constructor(
    private prisma: PrismaService,
    private movieService: MovieService,
  ) {}

  async saveFavMovie({ movieId }: MovieIdParamDto) {
    try {
      const movieData = await this.movieService.fetchMovieById(movieId);

      if (!movieData) {
        throw new HttpException('Movie not found', HttpStatus.NOT_FOUND);
      }

      const { Title, Poster, Year } = movieData;

      const favoriteMovie = await this.prisma.favorite.create({
        data: {
          id: movieId,
          title: Title,
          poster: Poster,
          type: 'movie',
          year: Year,
        },
      });

      return {
        message: 'Favorite movie saved successfully',
        movie: favoriteMovie,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to save favorite movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getFavMovies() {
    const movies = await this.prisma.favorite.findMany();
    if (!movies || movies.length === 0) {
      throw new HttpException('No favorite movies found', HttpStatus.NOT_FOUND);
    }
    return movies;
  }

  async deleteFavMovie({ movieId }: MovieIdParamDto) {
    try {
      const deletedMovie = await this.prisma.favorite.delete({
        where: {
          id: movieId,
        },
      });

      return {
        message: 'Favorite movie deleted successfully',
        movie: deletedMovie,
      };
    } catch (error) {
      if (error.code === 'P2025') {
        throw new HttpException(
          'Favorite movie not found',
          HttpStatus.NOT_FOUND,
        );
      }

      throw new HttpException(
        'Failed to delete favorite movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateFavMovie(
    { movieId }: MovieIdParamDto,
    updateData: UpdateMovieDto,
  ) {
    try {
      const existingMovie = await this.prisma.favorite.findUnique({
        where: {
          id: movieId,
        },
      });

      if (!existingMovie) {
        throw new HttpException(
          'Favorite movie not found',
          HttpStatus.NOT_FOUND,
        );
      }

      const updatedMovie = await this.prisma.favorite.update({
        where: {
          id: movieId,
        },
        data: {
          ...updateData,
        },
      });

      return {
        message: 'Favorite movie updated successfully',
        movie: updatedMovie,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to update favorite movie',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
