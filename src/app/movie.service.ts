import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { Movie } from './Movie';

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private selectedMovie$:Subject<Movie> = new Subject<Movie>()
  private apiKey:string ="02f89b2584b78aa77171c14740eba5a9"
  private baseApiUrl:string = "https://api.themoviedb.org/3/search/movie"

  constructor(private http:HttpClient) {  }

  get currentMovie(){
    return this.selectedMovie$
  }

  searchMovie(query:string){
    const params = new HttpParams().set('api_key', this.apiKey).set('query', query)
    return this.http.get<any>(this.baseApiUrl, { params }).pipe(map( res => res.results))
  }

  changeSelectedMovie(movie:Movie){
    this.selectedMovie$.next(movie)
  }
}
