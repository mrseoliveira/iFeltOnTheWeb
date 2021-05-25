import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { MoviesService } from "../../movie.service";

import { Movie } from "../../models/movie.model";

@Component({
  selector: "app-list-movies",
  templateUrl: "./listMovies.component.html",
  styleUrls: ["./listMovies.component.css"],
})
export class ListMoviesComponent implements OnInit {
  movies: Movie[] = [];
  private MoviesSub: Subscription;

  constructor(public moviesService: MoviesService, private router: Router) {}

  ngOnInit() {
    this.moviesService.getMovies();

    this.MoviesSub = this.moviesService
      .getMoviesUpdateListener()
      .subscribe((movies: Movie[]) => {
        // console.log('getMoviesUpdate no list component', movies)
        this.movies = movies;

      });
  }
}
