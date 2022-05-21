import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookingModel} from '../models/booking.model';
import {AdvertisementModel} from '../models/advertisement.model';

@Injectable({
  providedIn: 'root'
})
export class AdvertisementService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'Advertisements';
  constructor(private http: HttpClient) { }

  getAdvertisements(): Observable<AdvertisementModel>{
    return this.http.get<AdvertisementModel>(this.basePath + this.apiEndPoint);
  }

  postAdvertisements(data: AdvertisementModel): Observable<AdvertisementModel>{
    return this.http.post<AdvertisementModel>(this.basePath + this.apiEndPoint, data);
  }
  deleteAdvertisementsById(id: number): Observable<AdvertisementModel>{
    return this.http.delete<AdvertisementModel>(this.basePath + this.apiEndPoint + '/' + id.toString());
  }

  updateAdvertisementsById(id: number, data: any): Observable<AdvertisementModel>{
    return this.http.patch<AdvertisementModel>(this.basePath + this.apiEndPoint + '/' + id.toString(), data);
  }
  listAdvertisementsByUserId(userId: number): Observable<AdvertisementModel[]> {
    return this.http.get<AdvertisementModel[]>(this.basePath + this.apiEndPoint + '?userId=' + userId.toString());
  }

}
