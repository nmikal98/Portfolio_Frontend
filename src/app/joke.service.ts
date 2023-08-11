import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class JokeService {
  private apiUrl = 'https://official-joke-api.appspot.com/jokes/random';

  constructor(private http: HttpClient) {}

  getJoke(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
