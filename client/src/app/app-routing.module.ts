import { CreateMovieComponent } from "./components/movies/create/createMovie.component";
import { ListMoviesComponent } from "./components/movies/list/listMovies.component";
import { HomeComponent } from "./components/home/home.component";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "movies/list", component: ListMoviesComponent },
  { path: "movies/create", component: CreateMovieComponent },
  { path: "movies/edit/:movieId", component: CreateMovieComponent },
  { path: "movies/delete/:movieId", component: ListMoviesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
