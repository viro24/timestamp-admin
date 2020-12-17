import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { Router } from '@angular/router';
import { Tabelle2Employee } from './tabelle2Employee';
import { sharedStylesheetJitUrl } from '@angular/compiler';

@Component({
  selector: 'app-tabelle2',
  templateUrl: './tabelle2.component.html',
  styleUrls: ['./tabelle2.component.scss'],
})
export class Tabelle2Component implements OnInit {
  employees; //Liste der Mitarbeiter
  modelEmployee; //gezeigte Mitarbeiter
  selectedEmployee; //ausgewählter Mitarbeiter
  modelYear: string;
  year: string;
  overtimes;
  illnessesDays;
  remainingVacations;
  specialDays;
  showList = false;
  dataSource: Tabelle2Employee[];
  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) {}
  columnsToDisplay: string[] = [
    'name',
    'overtime',
    'illness',
    'vacation',
    'specialdays',
  ];

  ngOnInit(): void {
    this.getEmployees();
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

  handleClickFilter() {
    if (parseInt(this.modelYear) > 2000 && parseInt(this.modelYear) < 2030)
      this.updateDataSource();
    else {
      this.dialog.open(DialogErrorComponent),
        {
          height: '300px',
          width: '400px',
          data: {
            errorStatus: 'Error',
            action: 'Das eingegebene Jahr ist nicht korrekt',
          },
        };
    }
  }

  updateDataSource() {
    this.dataSource = [];
    this.selectedEmployee = this.modelEmployee;
    this.year = this.modelYear;
    this.selectedEmployee.forEach((e) => {
      var data: Tabelle2Employee;
      var id, rv, ot;
      var sd = 0;

      data = {
        name: e.firstName + ' ' + e.lastName,
        illness: null,
        overtime: null,
        vacation: null,
        specialDays: null,
      };
      this.dataSource.push(data);
      this.employeeService
        .getIllnessesByIdAndYear(e.employeeId, this.year)
        .subscribe(
          (dataID) => {
            data.illness = dataID.illnessDays;
          },
          (errorID) => {
            console.log('error illnessDays', errorID.status);
          }
        );
      this.employeeService
        .getOvertimesByIdAndYear(e.employeeId, this.year)
        .subscribe(
          (dataOT) => {
            data.overtime = dataOT.overtime;
          },
          (errorOT) => {
            console.log('error overtime ', errorOT.status);
          }
        );
      this.employeeService
        .getRemainingVacationsByIdAndYear(e.employeeId, this.year)
        .subscribe(
          (dataRV) => {
            data.vacation = dataRV.remainingVacation;
          },
          (errorRV) => {
            console.log('error vacation', errorRV.status);
          }
        );
      this.employeeService
        .getSpecialDaysByIdAndYear(e.employeeId, this.year)
        .subscribe(
          (dataSD) => {
            if (dataSD.length > 0) {
              const i = dataSD.findIndex(
                (dsd) => dsd.employeeId === e.employeeId
              );
              console.log('index : ', i);
              data.specialDays = dataSD[i].specialDays;
            } else {
              console.log('special days ist leer');
              data.specialDays = '0';
            }
          },
          (errorSD) => {
            console.log('special days', errorSD.status);
          }
        );
    });
  }

  handleClickNavi1() {
    this.router.navigateByUrl('/tabelle-1');
  }
  handleClickNavi3() {
    this.router.navigateByUrl('/tabelle-3');
  }
}
