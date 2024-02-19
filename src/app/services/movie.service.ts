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

  getMovies(slice: boolean = false, category: string, page: number) {
    const genreParams = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'it-IT');

    return this.http.get(`${environment.apiUrl}/genre/movie/list`, { params: genreParams }).pipe(
      switchMap(genreData => {
        const movieParams = new HttpParams()
          .set('api_key', this.apiKey)
          .set('page', page)
          .set('language', 'it-IT');

        return this.http.get<MovieList>(`${environment.apiUrl}/movie/${category}`, { params: movieParams }).pipe(
          map((response) => {
            const movies = response.results.map((movie: SimpleMovie) => {
              const roundedVoteAverage = movie.vote_average.toFixed(1);
              const releaseYear = movie.release_date.split("-")[0];
            
              return { 
                ...movie, 
                vote_average: parseFloat(roundedVoteAverage),
                release_date: releaseYear,
                genre: this.getGenreNames(movie.genre_ids, genreData) 
              };
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

  getMovieLogo(movieId: number) {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('language', 'en');

    const url = `${environment.apiUrl}/movie/${movieId}/images`;

    return this.http.get<any>(url, { params }).pipe(
      map(response => {
        console.log(response);
        
        const logos = response.logos;
        if (logos && logos.length > 0) {
          return logos[0].file_path;
        }
        return this.http.get<any>(url, { params: params.delete('language') }).pipe(
          map(response => {
            const logos = response.logos;
            if (logos && logos.length > 0) {
              console.log(params);
              
              return logos[0].file_path;
            }
            return null;
          })
        );
      })
    );
  }
}