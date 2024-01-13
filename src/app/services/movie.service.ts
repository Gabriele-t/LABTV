import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MovieList } from '../models/movie.model';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private apiKey = 'ff7577418c83df0de76681eceaf3c708';

  constructor(private http: HttpClient) { }

  get() {
    return this.http.get<MovieList>(environment.popularMovie)
  }

  search(query: string) {
    const params = {
      api_key: this.apiKey,
      query: query
    };
    return this.http.get<MovieList>(environment.search, { params }).pipe(
      catchError(error => {
        console.error('Errore durante la ricerca dei film:', error);
        throw error;
      })
    );
  }
}