import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import {Session } from '../models/session.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // private basePath = 'https://bono-vac-aleman.herokuapp.com/api/';
  private basePath = 'http://localhost:3000/';
  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'login', {email, password});
  }
  signup(data: any): Observable<Session> {
    return this.http.post<Session>(this.basePath + 'users', data);
  }

}
