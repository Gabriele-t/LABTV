import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  movieId: number = 0;

  movieDetails: any;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.getMovieDetails();
    });
  }

  getMovieDetails() {
    this.movieService.getMovieDetails(this.movieId).subscribe((data) => {
      this.movieDetails = data;
    });
  }
}