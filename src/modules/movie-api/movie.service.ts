import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';

@Injectable()
export class MovieService {
  constructor() {}

  private readonly apiKey = 'b1b1ea67';
  private readonly baseUrl = 'https://www.omdbapi.com/';

  async fetchMovieDetails(query: string): Promise<any> {
    try {
      const response: AxiosResponse<any> = await axios.get(this.baseUrl, {
        params: {
          apikey: this.apiKey,
          s: query,
        },
      });

      // Check if there was an error in the response
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
