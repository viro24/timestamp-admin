import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url: string = '/api/employees';
  constructor(private http: HttpClient) {}

  getStartDate(endDate: Date, range: number): Date {
    var date1 = new Date();
    var back = new Date(endDate.getTime() - range * 24 * 60 * 60 * 1000);
    return back;
  }

  toStringDateAndMonth(d: number): string {
    var result = '';
    if (d < 10) result = '0' + d.toString();
    else result = d.toString();
    return result;
  }

  getEmployees(): any {
    const params = new HttpParams().set('activeEmployement', 'true');
    return this.http.get(this.url, { params });
  }

  getBookingbyId(employeeId: string, dateStart: string, dateEnd: string): any {
    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/daily-booking-details/' +
        dateStart +
        '/' +
        dateEnd
    );
  }

  getIllnessesByIdAndYear(employeeId: string, year: string): any {
    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/illnesses/' +
        year +
        '-01-01/' +
        year +
        '-12-31'
    );
  }

  getOvertimesByIdAndYear(employeeId: string, year: string): any {
    return this.http.get(this.url + '/' + employeeId + '/overtimes/' + year);
  }

  getRemainingVacationsByIdAndYear(employeeId: string, year: string): any {
    return this.http.get(
      this.url + '/' + employeeId + '/remaining-vacations/' + year
    );
  }

  getSpecialDaysByIdAndYear(employeeId: string, year: string): any {
    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/special-days/' +
        year +
        '-01-01/' +
        year +
        '-12-31'
    );
  }

  getIllnessByIdAndDate(employeeId: string, endDate: Date, range: number): any {
    var startDate = this.getStartDate(endDate, range);

    var datumStart = this.toStringDateAndMonth(startDate.getDate());
    var monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    var yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    var datumEnd = this.toStringDateAndMonth(endDate.getDate());
    var monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    var yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/illnesses/' +
        yearStart +
        '-' +
        monthStart +
        '-' +
        datumStart +
        '/' +
        yearEnd +
        '-' +
        monthEnd +
        '-' +
        datumEnd
    );
  }

  getSpecialDaysByIdAndDate(
    employeeId: string,
    endDate: Date,
    range: number
  ): any {
    var startDate = this.getStartDate(endDate, range);

    var datumStart = this.toStringDateAndMonth(startDate.getDate());
    var monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    var yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    var datumEnd = this.toStringDateAndMonth(endDate.getDate());
    var monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    var yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/special-days/' +
        yearStart +
        '-' +
        monthStart +
        '-' +
        datumStart +
        '/' +
        yearEnd +
        '-' +
        monthEnd +
        '-' +
        datumEnd
    );
  }

  getVacationByIdAndDate(
    employeeId: string,
    endDate: Date,
    range: number
  ): any {
    var startDate = this.getStartDate(endDate, range);

    var datumStart = this.toStringDateAndMonth(startDate.getDate());
    var monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    var yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    var datumEnd = this.toStringDateAndMonth(endDate.getDate());
    var monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    var yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/vacations/' +
        yearStart +
        '-' +
        monthStart +
        '-' +
        datumStart +
        '/' +
        yearEnd +
        '-' +
        monthEnd +
        '-' +
        datumEnd
    );
  }

  getHourlyAccount(employeeId: string, endDate: Date, range: number): any {
    var startDate = this.getStartDate(endDate, range);

    var datumStart = this.toStringDateAndMonth(startDate.getDate());
    var monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    var yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    var datumEnd = this.toStringDateAndMonth(endDate.getDate());
    var monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    var yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

    return this.http.get(
      this.url +
        '/' +
        employeeId +
        '/hourly-accounts/' +
        yearStart +
        '-' +
        monthStart +
        '-' +
        datumStart +
        '/' +
        yearEnd +
        '-' +
        monthEnd +
        '-' +
        datumEnd
    );
  }
}
