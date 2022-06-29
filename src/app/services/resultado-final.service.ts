import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ResultadosFinalesModel} from '../models/resultadosFinales';
import {Publication} from '../models/publish.model';

@Injectable({
  providedIn: 'root'
})
export class ResultadoFinalService {
  // private basePath = 'https://bono-vac-aleman.herokuapp.com/api/';
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'resultados/';

  constructor(private http: HttpClient) {}

  getResultadosByUserId(userId: any): Observable<ResultadosFinalesModel[]>{
    return this.http.get<ResultadosFinalesModel[]>(this.basePath + this.apiEndPoint + '?userId=' + userId.toString());
    }
  postResultados(data: any): Observable<ResultadosFinalesModel>{
    return this.http.post<ResultadosFinalesModel>(this.basePath + this.apiEndPoint, data);
  }
  deleteResultadosById(id: number): Observable<ResultadosFinalesModel>{
    return this.http.delete<ResultadosFinalesModel>(this.basePath + this.apiEndPoint + '/' + id);
  }

}
