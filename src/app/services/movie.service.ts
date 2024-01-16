import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieList } from '../models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'ff7577418c83df0de76681eceaf3c708';

  constructor(private http: HttpClient) { }

  getPopularMovies() {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it');

    return this.http.get<MovieList>(environment.popularMovies, { params });
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

    return this.http.get<any>(url, { params });
  }
}