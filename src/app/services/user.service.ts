import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Observable} from 'rxjs';
import { User } from '../models/user.model';
import {StorageService} from './storage.service';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'users/';
  public currentUser = this.storageService.getCurrentUser().id;
  constructor(private http: HttpClient, private storageService: StorageService) { }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(this.basePath + this.apiEndPoint + id.toString());
  }
  updateUserById(id: number= this.currentUser, data: any): Observable<User>{
    return this.http.patch<User>(this.basePath + this.apiEndPoint + id.toString(), data);
  }
}
