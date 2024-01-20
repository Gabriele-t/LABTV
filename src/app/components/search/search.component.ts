import { Component } from '@angular/core';
import { SimpleMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: SimpleMovie[] = [];
  keyword: string = '';

  constructor(private movieService: MovieService) {}

  movieSearch() {
    if (this.keyword.trim() !== '') {
      this.movieService.search(this.keyword).subscribe(
        (data) => {
          this.searchResults = data.results;
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
