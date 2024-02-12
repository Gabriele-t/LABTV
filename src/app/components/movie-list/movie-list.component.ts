import { ViewportScroller } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { SimpleMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrl: './movie-list.component.css'
})
export class MovieListComponent {
  movieList = new Array<SimpleMovie>;
  imgSrc = environment.imgSrc;
  private movieListSubscription: Subscription = new Subscription();
  category: string = '';
  currentPage = 1;

  constructor(private movieService: MovieService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.category = params['category'];
    })
    this.fetchMovies();
  }

  fetchMovies() {
    this.movieListSubscription = this.movieService.getMovies(false, this.category, this.currentPage)
      .subscribe({
        next: (movieList) => {
          if (movieList) {
            this.movieList = movieList;
          } else {
            console.warn('Ricevuto un elenco di film vuoto.');
          }
        },
        error: (error) => {
          console.error('Errore nel recupero dei film:', error);
        }
      });
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    const pos = (document.documentElement.scrollTop || document.body.scrollTop) + document.documentElement.clientHeight;
    const max = document.documentElement.scrollHeight;
    if (pos === max) {
      this.loadNextPage();
    }
  }

  loadNextPage() {
    this.currentPage++;
    this.movieService.getMovies(false, this.category, this.currentPage)
      .subscribe({
        next: (movieList) => {
          if (movieList && movieList.length > 0) {
            this.movieList = this.movieList.concat(movieList);
          }
        },
        error: (error) => {
          console.error('Errore nel recupero dei film:', error);
        }
      });
  }

  ngOnDestroy() {
    if (this.movieListSubscription) {
      this.movieListSubscription.unsubscribe();
    }
  }
}