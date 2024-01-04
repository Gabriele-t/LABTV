import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieList } from '../models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<MovieList>('https://api.themoviedb.org/3/movie/popular?api_key=ff7577418c83df0de76681eceaf3c708&language=it&page=1')
  }
}
