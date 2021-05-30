import { Router } from "@angular/router";
import { MoviesService } from "./../../movie.service";
import { NgForm } from "@angular/forms";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { FormGroup, FormControl, Validators , ReactiveFormsModule} from "@angular/forms";
import { mimeType } from "./mime-type.validator";


import { Movie } from "./../../models/movie.model";
import { SelectorMatcher } from "@angular/compiler";

@Component({
  selector: "app-createMovie",
  templateUrl: "./createMovie.component.html",
  styleUrls: ["./createMovie.component.css"],
})
export class CreateMovieComponent implements OnInit {
  private mode = "create";
  private movieId: string;
  // private movie: Movie;

  form: FormGroup;
  imagePreview: string;

  constructor(
    public moviesService: MoviesService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      _id: new FormControl(null),
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
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {

      if (paramMap.has("movieId")) {
        this.mode = "edit";
        this.movieId = paramMap.get("movieId");
        // this.movieId = +this.getId;

        this.moviesService
          .getMovie(this.movieId)
          .subscribe((movieReceived: Movie) => {



       this.form.setValue({
              _id: movieReceived._id,
              title: movieReceived.title,
              imagePreview: movieReceived.file,
              direction: movieReceived.direction,
              year: movieReceived.year,
              country: movieReceived.country,
              duration: movieReceived.duration,
              name1 : movieReceived.cast.name1,
                name2: movieReceived.cast.name2,
              })

      });
      //to preview image when editing

      } else {
        this.mode = "create";
      }
    });
  }

  onMovieCreate() {

    if (this.form.invalid) {
      return;
    }

    if (this.mode === "create") {
      const movie: Movie = {
        _id: null,
        title: this.form.value.title,
        file: this.form.value.imagePreview,
        direction: this.form.value.direction,
        year: this.form.value.year,
        country: this.form.value.country,
        duration: this.form.value.duration,
        cast: {
          name1: this.form.value.name1,
          name2: this.form.value.name2,
        },
      };
      this.moviesService.addMovie(movie);

    } else {
      const movie: Movie = {
        _id:+this.form.value._id,
        title: this.form.value.title,
        file: this.form.value.imagePreview,
        direction: this.form.value.direction,
        year: this.form.value.year,
        country: this.form.value.country,
        duration: this.form.value.duration,
        cast: {
          name1: this.form.value.name1,
          name2: this.form.value.name2,
        },
      };
      this.moviesService.updateMovie(movie, this.form.value._id);
    }
    this.form.reset();

  }


  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ imagePreview: file });
    this.form.get('imagePreview').updateValueAndValidity();
    // console.log(file);

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };

    reader.readAsDataURL(file);
  }
}












    //todo o event vai embrulhado
    //HTMLInputElement permite fazer type conversion, para lermos o elemento como um ficheiro
    //queremos guardor isto no nosso controlador, para isso criamos o imagePreview no formulario.
    //reparem que não precisamos ter o controlado no HTML se não existir
    //patchValue permite fazer set de um unico controlador
    //depois criamos o objecto file que vai ser prescrutado par percebermos que tipo é
    //updateValueAndValidity comunica ao angular que alterei o valor do campo imagePreview e pedimos-lhe para ele validar, para ver se está de acordo com as validações que temos.
    // fileREader permite ler um ficheiro
    // que tem uma função que permite ler o conteudo de um ficheiro e mostra-lo
    //the next line will call the validators we have above in the FormGroup, that will cann the mimetype validator
    //como é assincrono usamos uma callback
