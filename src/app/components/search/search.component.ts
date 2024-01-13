import { Component } from '@angular/core';
import { Movie, MovieList } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: Movie[] = [];
  keyword: string = '';

  constructor(private movieService: MovieService) {}

  movieSearch(): void {
    if (this.keyword.trim() !== '') {
      this.movieService.search(this.keyword).subscribe(
        (data: MovieList) => {
          this.searchResults = data.results;
        },
        (error) => {
          // Gestisci l'errore come preferisci
        },
        () => {
          // Puoi gestire il completamento se necessario
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
