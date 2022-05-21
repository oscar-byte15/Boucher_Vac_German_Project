import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {  Publication } from '../models/publish.model';


@Injectable({
  providedIn: 'root'
})
export class PublicationService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'publications';
  constructor(private http: HttpClient) { }

  getPublications(): Observable<Publication>{
    return this.http.get<Publication>(this.basePath + this.apiEndPoint);
  }

  postPublication(data: any): Observable<Publication>{
    return this.http.post<Publication>(this.basePath + this.apiEndPoint, data);
  }
  deletePublicationById(id: number): Observable<Publication>{
    return this.http.delete<Publication>(this.basePath + this.apiEndPoint + '/' + id.toString());
  }

  updatePublicationById(id: number, data: any): Observable<Publication>{
    return this.http.put<Publication>(this.basePath + this.apiEndPoint + '/' + id.toString(), data);
  }
  getPublicationById(id: number): Observable<Publication>{
    return this.http.get<Publication>(this.basePath + this.apiEndPoint + '/' + id);
  }
  listPublishByUserId(userId: number): Observable<Publication[]> {
    return this.http.get<Publication[]>(this.basePath + this.apiEndPoint + '?userId=' + userId.toString());
  }
  getPublicationsByTitle(title: string): Observable<Publication[]>{

    return this.http.get<Publication[]>(this.basePath + this.apiEndPoint + `?title=${title}`);
  }



}
