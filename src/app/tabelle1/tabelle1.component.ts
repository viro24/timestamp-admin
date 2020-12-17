import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-tabelle1',
  templateUrl: './tabelle1.component.html',
  styleUrls: ['./tabelle1.component.scss'],
})
export class Tabelle1Component implements OnInit {
  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });
  employees: any[];
  currentEmployeeId: any;
  dateStart;
  dateEnd;
  open: boolean = false;
  displayColumns: string[] = [
    'datum',
    'start',
    'end',
    'istAZ',
    'sollAZ',
    'istPause',
    'sollPause',
    'ueberstunde',
  ];
  bookingData;
  treeData;

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  handleClickFilter(): void {
    this.getBookingData();
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log('succeed getting employees');
      },
      (error) => {
        console.log('error getting employees', error.status);
        this.dialog.open(DialogErrorComponent, {
          height: '300px',
          width: '400px',
          data: {
            errorStatus: error.status,
            action: 'Get Employees fehlgeschlagen.',
          },
        });
      }
    );
  }

  dateFormat(date: string): string {
    var dateAbs = Math.abs(+date);
    let dateNum = dateAbs / 1000;
    let hour = Math.floor(dateNum / 3600);
    let minute = (dateNum % 3600) / 60;
    let result = '';
    if (hour < 10) result += '0';
    result += hour.toString() + ':';
    if (minute < 10) result += '0';
    result += minute.toString();
    if (+date >= 0) return result;
    else return '-' + result;
  }

  getBookingData(): void {
    this.employeeService
      .getBookingbyId(
        this.currentEmployeeId,
        this.dateStart.toJSON().substring(0, 10),
        this.dateEnd.toJSON().substring(0, 10)
      )
      //.getBookingbyId(this.currentEmployeeId, '2020-09-01', '2020-09-02')
      .subscribe(
        (data) => {
          this.bookingData = data;
          console.log('succeed getting bookingData');
          //TODO : convert bookingData to a tree
        },
        (error) => {
          console.log('error getting booking data');
          this.dialog.open(DialogErrorComponent, {
            height: '300px',
            width: '400px',
            data: {
              errorStatus: error.status,
              action: 'Get bookingdata fehlgeschlagen.',
            },
          });
        }
      );
  }

  handleOpenCell() {
    console.log('Hallo');
    this.open = !this.open;
  }
  handleClickNavi2() {
    this.router.navigateByUrl('/tabelle-2');
  }
  handleClickNavi3() {
    this.router.navigateByUrl('/tabelle-3');
  }
}
