import { Component, OnInit, OnDestroy } from '@angular/core';
import { SimpleMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrl: './main-carousel.component.css'
})
export class MainCarouselComponent implements OnInit, OnDestroy {
  movieList = new Array<SimpleMovie>;
  imgSrc = environment.imgSrc;
  slickConfig = {
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: false
  };
  private movieListSubscription: Subscription = new Subscription();

  moviePurchased: boolean = false;
  loggedUser = this.authService.getLoggedUser();

  constructor(private movieService: MovieService, public authService: AuthService) { }

  ngOnInit() {
    this.fetchMovies();
  }

  private fetchMovies() {
    this.movieListSubscription = this.movieService.getMovies(true, 'popular', 1).subscribe({
      next: (movieList) => {
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