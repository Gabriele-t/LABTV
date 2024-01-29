import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LoggedUser } from 'src/app/models/auth.model';
import { DetailedMovie, Video } from 'src/app/models/movie.model';
import { AuthService } from 'src/app/services/auth.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;
  movieDetails: DetailedMovie = {} as DetailedMovie;
  movieVideo = new Video;
  showPurchaseButton: boolean = true;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
    });

    this.movieService.getMovieDetails(this.movieId).subscribe((data) => {
      this.movieDetails = data;
    });

    this.movieService.getMovieVideo(this.movieId).subscribe((movieVideo) => {
      this.movieVideo = movieVideo;
    });

    const loggedUser = this.authService.getLoggedUser();

    if (loggedUser) {
      this.authService.hasPurchasedMovie(loggedUser.user.id, this.movieId).subscribe(
        (hasPurchased) => {
          this.showPurchaseButton = !hasPurchased;
        },
        error => {
          console.error('Errore durante la verifica dell\'acquisto:', error);
        }
      );
    }
  }

  purchaseMovie() {
    const userId = this.authService.getLoggedUser()?.user.id;

    if (userId) {
      this.authService.purchase(userId, this.movieId).subscribe({
        next: () => {
          console.log('Acquisto effettuato con successo!');
          this.showPurchaseButton = !this.showPurchaseButton
        },
        error: error => {
          console.error('Errore durante l\'acquisto:', error);
        }
      });
    } else {
      console.log('Utente non autenticato. Effettuare l\'accesso per acquistare.');
      this.router.navigate(['login'])
    }
  }
}