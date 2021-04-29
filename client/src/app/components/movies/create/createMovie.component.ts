import { Router } from "@angular/router";
import { MoviesService } from "./../../movie.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { Movie } from "./../../models/movie.model";
import { compileDirectiveFromRender2 } from "@angular/compiler/src/render3/view/compiler";

@Component({
  selector: "app-createMovie",
  templateUrl: "./createMovie.component.html",
  styleUrls: ["./createMovie.component.css"],
})
export class CreateMovieComponent implements OnInit {
  private mode = "create";
  private getId: string;
  movieId: string;
  private movie: Movie;

  constructor(
    public moviesService: MoviesService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      console.log("param ngOnInit", paramMap);
      if (paramMap.has("movieId")) {
        this.mode = "edit";
        this.getId = paramMap.get("movieId");
        // this.movieId = +this.getId;
        this.movieId = this.getId;
        console.log("ngOninit create", this.movieId);
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
            // _id: movie.returnedMovie._id,
            // title: movie.returnedMovie.title,
            // file: movie.returnedMovie.file,
            // direction: movie.returnedMovie.direction,
            // year: movie.returnedMovie.year,
            // country: movie.returnedMovie.country,
            // duration: movie.returnedMovie.duration,
            // cast: {
            //   name1: movie.returnedMovie.name1,
            //   name2: movie.returnedMovie.name2,
            // },
            // console.log(data.returnedMovie.title);
          });
      } else {
        this.mode = "create";
        // this.movie._id = null;
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
