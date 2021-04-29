import { Router } from "@angular/router";
import { MoviesService } from "./../../movie.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Movie } from "./../../models/movie.model";

@Component({
  selector: "app-createMovie",
  templateUrl: "./createMovie.component.html",
  styleUrls: ["./createMovie.component.css"],
})
export class CreateMovieComponent implements OnInit {
  private mode = "create";
  private movieId: string;
  private movie: Movie;

  constructor(
    public moviesService: MoviesService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("movieId")) {
        this.mode = "edit";
        this.movieId = paramMap.get("movieId");
        // this.movieId = +this.getId;
        this.moviesService
          .getMovie(this.movieId)
          .subscribe((movieReceived: Movie) => {
            // console.log(movie);
            this.movie = {
              _id: movieReceived._id,
              title: movieReceived.title,
              file: movieReceived.file,
              direction: movieReceived.direction,
              year: movieReceived.year,
              country: movieReceived.country,
              duration: movieReceived.duration,
              cast: {
                name1: movieReceived.cast.name1,
                name2: movieReceived.cast.name2,
              },
            };
          });
      } else {
        this.mode = "create";
      }
    });
  }

  onMovieCreate(form: NgForm) {
    if (form.invalid) {
      return;
    }

    const movie: Movie = {
      _id: null,
      title: form.value.title,
      file: form.value.file,
      direction: form.value.direction,
      year: form.value.year,
      country: form.value.country,
      duration: form.value.duration,
      cast: {
        name1: form.value.name1,
        name2: form.value.name2,
      },
    };

    // console.log("create movie", movie);
    this.moviesService.addMovie(movie);
    // console.log("onMovieCreate",this.moviesService.addMovie(movie))
    this.router.navigate(["/home"]);
  }
}
