import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DetailedMovie, MovieList, SimpleMovie } from '../models/movie.model';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'ff7577418c83df0de76681eceaf3c708';

  constructor(private http: HttpClient) { }

  getPopularMovies(slice: boolean = false) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it')

    return this.http.get<MovieList>(environment.popularMovies, { params }).pipe(
      map((response) => {
        if (slice) {
          response.results = response.results.slice(0, 4)
        }
        return response
      })
    )
  }

  search(query: string) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', query)
      .set('language', 'it');

    return this.http.get<MovieList>(environment.search, { params });
  }

  getMovieDetails(movieId: number) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it');

    const url = `${environment.movieDetails}/${movieId}`;

    return this.http.get<DetailedMovie>(url, { params });
  }
}