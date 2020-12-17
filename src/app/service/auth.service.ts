import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = '/api';
  constructor(private http: HttpClient) {}

  logInTerminal(): any {
    const params = new HttpParams()
      .set('username', 'terminal')
      .set('password', '%trmnl%');

    return this.http.post(this.url + '/login', null, { params });
  }

  logOutTerminal(): any {
    return this.http.post(this.url + '/logout', {});
  }

  logInEmployee(name: string, password: string): any {
    const params = new HttpParams()
      .set('username', name)
      .set('password', password);
    return this.http.post(this.url + '/login', {}, { params });
  }
}
