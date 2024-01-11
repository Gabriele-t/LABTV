import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieList } from '../models/movie.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<MovieList>(environment.popularMovie)
  }
}