import { Injectable } from '@nestjs/common';
import { MovieIdParamDto } from './dto/movieId-param.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class FavMovieService {
  constructor(private prisma: PrismaService) {}

  // async getMovieDetails({ movieId }: MovieIdParamDto) {
  //   const movie = this.prisma.fa
  // }

  async createOrUpdateFavMovie() {}

  async getFavMovies() {}

  async deleteFavMovie() {}
}
