import { Router } from "@angular/router";
import { MoviesService } from "./../../movie.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { mimeType } from "./mime-type.validator";

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

  form: FormGroup;
  imagePreview: string;

  constructor(
    public moviesService: MoviesService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required],
      }),
      imagePreview: new FormControl(null, {
        validators: [Validators.required],
        //angular differentiate from validators to async validators
        asyncValidators: [mimeType],
      }),
      direction: new FormControl(null, { validators: [Validators.required] }),
      // Validators.minLength(3)
      year: new FormControl(null, {
        validators: [
          Validators.minLength(4),
          Validators.maxLength(4),
          Validators.required,
        ],
      }),
      country: new FormControl(null, { validators: [Validators.required] }),
      duration: new FormControl(null, { validators: [Validators.required] }),
      name1: new FormControl(),
      name2: new FormControl(),
      // Validators.minLength(3)
      // Validators.minLength(3)
    });

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

  onMovieCreate() {

    if (this.form.invalid) {
      return;
    }

    const movie: Movie = {
      _id: null,
      title: this.form.value.title,
      file: this.imagePreview,
      direction: this.form.value.direction,
      year: this.form.value.year,
      country: this.form.value.country,
      duration: this.form.value.duration,
      cast: {
        name1: this.form.value.name1,
        name2: this.form.value.name2,
      },
    };

    // console.log(this.form.value);

    // // console.log("create movie", movie);
    this.moviesService.addMovie(movie);
    // // console.log("onMovieCreate",this.moviesService.addMovie(movie))
    // this.router.navigate(["/home"]);
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagePreview: file });
    //the next line will call the validators we have above in the FormGroup, that will cann the mimetype validator
    this.form.get("imagePreview").updateValueAndValidity();
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
  }
}
