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

  movieSearch() {
    if (this.keyword.trim() !== '') {
      this.movieService.search(this.keyword).subscribe(
        (data) => {
          this.searchResults = data.results;
          console.log(data);
        }
      );
    } else {
      this.searchResults = [];
    }
  }
}
