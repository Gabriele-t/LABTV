import { Component } from '@angular/core';
import { MovieList } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  public movieList = new MovieList
  public imgSrc = environment.imgSrc

  constructor(private movieService: MovieService) {
    this.movieService.get().subscribe(movieList => {
      this.movieList = movieList
      console.log(this.movieList)
    })
  }
}
