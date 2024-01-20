import { Component, OnInit, OnDestroy } from '@angular/core';
import { MovieList } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent implements OnInit, OnDestroy {
  movieList: MovieList = new MovieList();
  imgSrc = environment.imgSrc;
  slickConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false
  };
  private movieListSubscription: Subscription = new Subscription();

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchPopularMovies();
  }

  private fetchPopularMovies() {
    this.movieListSubscription = this.movieService.getPopularMovies(true).subscribe({
      next: (movieList: MovieList) => {
        if (movieList) {
          this.movieList = movieList;
        } else {
          console.warn('Ricevuto un elenco di film vuoto.');
        }
      },
      error: (error) => {
        console.error('Errore nel recupero dei film popolari:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.movieListSubscription) {
      this.movieListSubscription.unsubscribe();
    }
  }
}