import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  url = '/api/employees';

  constructor(private http: HttpClient) {
  }

  getStartDate(endDate: Date, range: number): Date {
    let date1 = new Date();
    let back = new Date(endDate.getTime() - range * 24 * 60 * 60 * 1000);
    return back;
  }

  toStringDateAndMonth(d: number): string {
    let result = '';
    if (d < 10) {
      result = '0' + d.toString();
    } else {
      result = d.toString();
    }
    return result;
  }

  getEmployees(): any {
    const params = new HttpParams().set('activeEmployement', 'true');
    return this.http.get(this.url, {params});
  }

  getBookingbyId(employeeId: string, dateStart: Date, dateEnd: Date): any {
    let datumStart = this.toStringDateAndMonth(dateStart.getDate());
    let monthStart = this.toStringDateAndMonth(dateStart.getMonth() + 1);
    let yearStart = this.toStringDateAndMonth(dateStart.getFullYear());

    let datumEnd = this.toStringDateAndMonth(dateEnd.getDate());
    let monthEnd = this.toStringDateAndMonth(dateEnd.getMonth() + 1);
    let yearEnd = this.toStringDateAndMonth(dateEnd.getFullYear());
    return this.http.get(
      this.url +
      '/' +
      employeeId +
      '/daily-booking-details/' +
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
    // return this.http.get(
    //   this.url +
    //     '/' +
    //     employeeId +
    //     '/daily-booking-details/' +
    //     dateStart +
    //     '/' +
    //     dateEnd
    // );
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
    let startDate = this.getStartDate(endDate, range);

    let datumStart = this.toStringDateAndMonth(startDate.getDate());
    let monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    let yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    let datumEnd = this.toStringDateAndMonth(endDate.getDate());
    let monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    let yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

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
    let startDate = this.getStartDate(endDate, range);

    let datumStart = this.toStringDateAndMonth(startDate.getDate());
    let monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    let yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    let datumEnd = this.toStringDateAndMonth(endDate.getDate());
    let monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    let yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

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
    let startDate = this.getStartDate(endDate, range);

    let datumStart = this.toStringDateAndMonth(startDate.getDate());
    let monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    let yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    let datumEnd = this.toStringDateAndMonth(endDate.getDate());
    let monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    let yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

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
    let startDate = this.getStartDate(endDate, range);

    let datumStart = this.toStringDateAndMonth(startDate.getDate());
    let monthStart = this.toStringDateAndMonth(startDate.getMonth() + 1);
    let yearStart = this.toStringDateAndMonth(startDate.getFullYear());

    let datumEnd = this.toStringDateAndMonth(endDate.getDate());
    let monthEnd = this.toStringDateAndMonth(endDate.getMonth() + 1);
    let yearEnd = this.toStringDateAndMonth(endDate.getFullYear());

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
