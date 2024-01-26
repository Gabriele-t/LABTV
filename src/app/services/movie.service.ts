import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedMovie, MovieList, SimpleMovie, VideoResponse } from '../models/movie.model';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'ff7577418c83df0de76681eceaf3c708';

  constructor(private http: HttpClient) { }

  getPopularMovies(slice: boolean = false) {
    const genreParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it-IT');

    return this.http.get(`${environment.apiUrl}/genre/movie/list`, { params: genreParams }).pipe(
      switchMap(genreData => {
        const movieParams = new HttpParams()
          .set('api_key', this.apiKey)
          .set('language', 'it-IT');

        return this.http.get(`${environment.apiUrl}/movie/popular`, { params: movieParams }).pipe(
          map((response: any) => {
            const movies = response.results.map((movie: SimpleMovie) => {
              return { ...movie, genre: this.getGenreNames(movie.genre_ids, genreData) };
            });

            if (slice) {
              return movies.slice(0, 4);
            }

            return movies;
          })
        );
      })
    )
  }

  getGenreNames(genreIds: number[], genreData: any): string {
    const genreMap: Record<number, string> = {};

    genreData.genres.forEach((genre: any) => {
      genreMap[genre.id] = genre.name;
    });

    const genres = genreIds.map(genreId => genreMap[genreId]);
    return genres.join(', ');
  }

  search(query: string) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query)
      .set('language', 'it');

    return this.http.get<MovieList>(`${environment.apiUrl}/search/movie`, { params });
  }

  getMovieDetails(movieId: number) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it');

    const url = `${environment.apiUrl}/movie/${movieId}`;

    return this.http.get<DetailedMovie>(url, { params });
  }

  getMovieVideo(movieId: number) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it')
      .set('type', 'Trailer');

    const url = `${environment.apiUrl}/movie/${movieId}/videos`;

    return this.http.get<VideoResponse>(url, { params }).pipe(
      map(response => response.results[0])
    );
  }
}