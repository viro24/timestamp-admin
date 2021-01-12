import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BreakService {
  url = '/api/breakings/';
  constructor(private http: HttpClient) {}

  deleteBreakByBreakId(breakId: number): any {
    return this.http.delete(this.url + breakId);
  }

  editBreakByBreakId(breakId, breakStart, breakEnd): any {
    return this.http.put(this.url + breakId, {
      breakingEnd: breakEnd,
      breakingStart: breakStart,
    });
  }

  addBreak(bookId, breakStart, breakEnd): any {
    return this.http.post(this.url, {
      bookingId: bookId,
      breakingEnd: breakEnd,
      breakingStart: breakStart,
    });
  }
}
