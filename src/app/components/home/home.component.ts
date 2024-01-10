import { Component } from '@angular/core';
import { MovieList } from 'src/app/models/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { environment } from 'src/environments/environment'
import { SlickCarouselModule } from 'ngx-slick-carousel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  movieList = new MovieList
  imgSrc = environment.imgSrc
  slickConfig = {
    slidesToShow: 2,
    slidesToScroll: 1,
    arrows: true,
    infinite: true,
  };

  constructor(private movieService: MovieService) {
    this.movieService.get().subscribe(movieList => {
      this.movieList = movieList
      console.log(this.movieList)
    })
  }
}