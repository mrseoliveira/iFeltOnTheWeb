import { Injectable } from "@angular/core";
import { Movie } from "./models/movie.model";
import { Emotions } from "./models/emotions";
import { BehaviorSubject } from "rxjs";
import { map } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class MoviesService {
  private movies: Movie[] = [];
  private moviesUpdated = new BehaviorSubject<Movie[]>([]);

  emotions: Emotions[] = [
    { emotion: "happy" },
    { emotion: "sad" },
    { emotion: "inspiring" },
    { emotion: "melancholoic" },
    { emotion: "anger" },
  ];

  constructor(private httpClient: HttpClient, private router: Router) {}

  getMovies() {
    this.httpClient
      .get<{ message: string; movies: Movie[] }>(
        "http://localhost:8080/api/movies"
      )
      .subscribe((postData) => {
        this.movies = postData.movies;
        // console.log(this.movies);
        this.moviesUpdated.next([...this.movies]);
      });
  }

  getEmotions() {
    return this.emotions;
  }

  addMovie(movie: Movie) {
    // console.log("movie service", movie);
    this.httpClient
      .post<Movie>("http://localhost:8080/api/movies", movie)
      .subscribe((responseData) => {
        console.log("responseData", responseData);
        this.router.navigate(["/"]);
      });
  }

  getMoviesUpdateListener() {
    return this.moviesUpdated.asObservable();
  }

  getMovie(id: string) {
    return this.httpClient
      .get<{ returnedMovie: Movie }>("http://localhost:8080/api/movies/" + id)
      .pipe(map((res) => res.returnedMovie));
  }
}
