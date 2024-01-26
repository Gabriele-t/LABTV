import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(private route: ActivatedRoute, private movieService: MovieService, private authService: AuthService) {}

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
    if (this.movieId !== 0 && this.loggedUser) {
      // Effettua la chiamata al servizio di acquisto con l'id del film e le informazioni dell'utente
      this.authService.purchase(this.loggedUser.user.id, this.movieId, this.loggedUser.accessToken)
        .subscribe(
          response => {
            alert('Acquisto completato con successo!');
          },
          error => {
            alert('Errore durante l\'acquisto. Riprova.');
          }
        );
    } else {
      alert('Errore durante l\'acquisto. Riprova.');
    }
  }
}