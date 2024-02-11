import { Component, ElementRef, HostListener } from '@angular/core';
import { SimpleMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchResults: SimpleMovie[] = [];
  keyword: string = '';
  imgSrc = environment.imgSrc;

  constructor(private movieService: MovieService, private el: ElementRef) { }

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

  @HostListener('document:click', ['$event'])
  handleDocumentClick(event: MouseEvent) {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.searchResults = [];
      this.keyword = ''
    }
  }

  handleMovieClick() {
    this.searchResults = [];
    this.keyword = ''
  }
}