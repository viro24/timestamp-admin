import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  url = '/api/bookings/';
  constructor(private http: HttpClient) {}

  /** Sample Request body : {
  "employeeId": "10",
  "end": "2020-09-01T16:00:00.126Z",
  "location": "EXTERNAL",
  "start": "2020-09-01T08:00:00.126Z"
} */
  editBookingByBookingId(
    bookingId,
    employeeId,
    dateStart,
    dateEnd,
    location
  ): any {
    return this.http.put(this.url + bookingId, {
      employeeId: employeeId,
      end: dateEnd,
      location: location,
      start: dateStart,
    });
  }

  deleteBookingByBookingId(bookingId: number): any {
    return this.http.delete(this.url + bookingId);
  }

  addBooking(employeeId: string, start: any, end: any, location: string): any {
    return this.http.post(this.url, {
      employeeId: employeeId,
      end: end,
      location: location,
      start: start,
    });
  }
}
