import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  loggedUser: LoggedUser | null = null;

  constructor(private route: ActivatedRoute, private movieService: MovieService, private authService: AuthService) { }

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

    this.loggedUser = this.authService.getLoggedUser();
  }

  purchase() {
    if (this.canPurchase()) {
      this.handlePurchase();
    } else {
      this.showPurchaseError();
    }
  }

  private canPurchase(): boolean {
    return this.movieId !== 0 && this.loggedUser !== null && this.loggedUser !== undefined;
  }

  private handlePurchase() {
    if (this.loggedUser !== null && this.loggedUser !== undefined) {
      const userId = this.loggedUser.user.id;

      this.authService.purchase(userId, this.movieId)
        .subscribe({
          next: (response) => this.handlePurchaseSuccess(response),
          error: (error) => this.handlePurchaseError(error)
        });
    } else {
      this.showPurchaseError();
    }
  }

  private handlePurchaseSuccess(response: Observable<object>) {
    alert('Acquisto completato con successo!');
    console.log(response);
    response.subscribe({
      next: (response) => console.log(response) 
    })
  }

  private handlePurchaseError(error: any) {
    alert('Errore durante l\'acquisto. Riprova.');
    console.error('Dettagli dell\'errore:', error);
  }

  private showPurchaseError() {
    alert('Errore durante l\'acquisto. Riprova.');
  }
}