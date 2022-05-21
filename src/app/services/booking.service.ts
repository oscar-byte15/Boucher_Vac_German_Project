import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BookingModel} from '../models/booking.model';
import {Publication} from '../models/publish.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private basePath = 'http://localhost:3000/';
  apiEndPoint = 'bookings';
  constructor(private http: HttpClient) { }

  getBookings(): Observable<BookingModel>{
    return this.http.get<BookingModel>(this.basePath + this.apiEndPoint);
  }

  postBooking(data: BookingModel): Observable<BookingModel>{
    return this.http.post<BookingModel>(this.basePath + this.apiEndPoint, data);
  }
  deleteBookingById(id: number): Observable<BookingModel>{
    return this.http.delete<BookingModel>(this.basePath + this.apiEndPoint + '/' + id.toString());
  }

  updateBookingById(id: number, data: any): Observable<BookingModel>{
    return this.http.patch<BookingModel>(this.basePath + this.apiEndPoint + '/' + id.toString(), data);
  }
  listBookingByUserId(userId: number): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(this.basePath + this.apiEndPoint + '?user_id_from=' + userId.toString());
  }
  listBookingByUserId_At(userId: number): Observable<BookingModel[]> {
    return this.http.get<BookingModel[]>(this.basePath + this.apiEndPoint + '?user_id_at=' + userId.toString());
  }

}
