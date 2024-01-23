import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedMovie, MovieList, SimpleMovie } from '../models/movie.model';
import { environment } from 'src/environments/environment';
import { map, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'ff7577418c83df0de76681eceaf3c708';

  constructor(private http: HttpClient) { }

  getPopularMovies(slice: boolean = false) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it-IT')

      return this.http.get(`${environment.apiUrl}/genre/movie/list`, { params }).pipe(
        switchMap(genreData => {
          const genreIds = (genreData as any).genres.map((genre: any) => genre.id)

          return this.http.get(`${environment.apiUrl}/movie/popular`, { params }).pipe(
            map((response: any) => {
              return response.results.map((movie: SimpleMovie)  => {
                return { ...movie, genre: this.getGenreNames(movie.genre_ids, genreData) };
              })
            })
          )
        })
      )

    // return this.http.get<MovieList>(`${environment.apiUrl}/movie/popular`, { params }).pipe(
    //   map((response) => {
    //     if (slice) {
    //       response.results = response.results.slice(0, 4)
    //     }

    //     return response
    //   })
    // )
  }

  private getGenreNames(genreIds: number[], genreData: any): string {
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
}