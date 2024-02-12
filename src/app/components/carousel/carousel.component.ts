import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { SimpleMovie } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrl: './carousel.component.css'
})
export class CarouselComponent {
  movieList = new Array<SimpleMovie>;
  imgSrc = environment.imgSrc;
  slickConfig = {
    slidesToShow: 4,
    slidesToScroll: 4,
    infinite: false,
  };
  private movieListSubscription: Subscription = new Subscription();
  @Input() category: string = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  private fetchMovies() {
    this.movieListSubscription = this.movieService.getMovies(false, this.category, 1).subscribe({
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
