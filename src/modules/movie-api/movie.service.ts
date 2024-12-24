import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosResponse } from 'axios';
import { MovieSearchParamDto } from '../omdb-api/dto/query-param.dto';

@Injectable()
export class MovieService {
  constructor(private config: ConfigService) {}

  async fetchMovieDetails({ search }: MovieSearchParamDto): Promise<any> {
    const apiKey = this.config.get('MOVIE_API_KEY');
    const baseUrl = this.config.get('MOVIE_API_BASE_URL');
    try {
      const response: AxiosResponse<any> = await axios.get(
        `${baseUrl}${apiKey}&s=${search}`,
      );
      if (response.data.Response === 'False') {
        throw new HttpException(response.data.Error, HttpStatus.NOT_FOUND);
      }

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch movie details',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
