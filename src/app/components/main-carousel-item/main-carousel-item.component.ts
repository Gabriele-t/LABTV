import { Component, Input } from '@angular/core';
import { SimpleMovie } from 'src/app/models/movie.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-main-carousel-item',
  templateUrl: './main-carousel-item.component.html',
  styleUrl: './main-carousel-item.component.css'
})
export class MainCarouselItemComponent {
  imgSrc = environment.imgSrc;
  moviePurchased: boolean = false;
  @Input() movie: SimpleMovie = new SimpleMovie
  logoUrl: string = '';

  constructor (private authService: AuthService, private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.getMovieLogo(this.movie.id).subscribe(logoUrl => {
      console.log(logoUrl);
      
      this.logoUrl = this.imgSrc + logoUrl;
    });
  }

  purchaseMovie(movieId: number, poster_path: string) {
    this.authService.purchase(movieId, poster_path).subscribe({
      next: () => {
        this.moviePurchased = true;
      },
      error: error => {
        console.error('Errore durante l\'acquisto:', error);
      }
    });
  }
}
