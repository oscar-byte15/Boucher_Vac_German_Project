import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {IndicadoresModel} from '../models/indicadores.model';


@Injectable({
  providedIn: 'root'
})

export class IndicadoresServices {
  // private basePath = 'http://localhost:3000/';
  private basePath = 'https://bono-vac-aleman.herokuapp.com/api/';
  apiEndPoint = 'indicadores/';

  constructor(private http: HttpClient) { }

  getIndicadoresById(userId: number): Observable<IndicadoresModel[]>{
    return this.http.get<IndicadoresModel[]>(this.basePath + this.apiEndPoint + '?userId=' + userId.toString());
  }

  postIndicadores(data: any): Observable<IndicadoresModel>{
    return this.http.post<IndicadoresModel>(this.basePath + this.apiEndPoint, data);
  }
   deleteIndicadorById(id: number): Observable<IndicadoresModel>{
     return this.http.delete<IndicadoresModel>(this.basePath + this.apiEndPoint + '/' + id);
   }


}
