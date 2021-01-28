import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {EmployeeService} from '../service/employee.service';
import {DialogErrorComponent} from '../dialog-error/dialog-error.component';
import {TabelleEmployee} from './tabelleEmployee';

@Component({
  selector: 'app-tabelle3',
  templateUrl: './tabelle3.component.html',
  styleUrls: ['./tabelle3.component.scss'],
})
export class Tabelle3Component implements OnInit {
  showRange = false;
  listSelectedEmployees = []; // list aller ausgewählten Mitarbeiter
  employees; // list aller Mitarbeiter
  dateStart;
  dateEnd;
  year = '2020';
  gruppe = 0;
  displayColumns: string[] = [
    'name',
    'bruto-arbeitstage',
    'sondertage',
    'sollAZ',
    'istAZ',
    'sollPause',
    'istPause',
    'gesammelte-ueberstunden',
  ];
  specialDay;
  listDataSource: TabelleEmployee[]; // datasource aller ausgewählten Mitarbeiter
  range = -1;
  message = 'Auswertung für den Zeitraum ';

  constructor(
    private employeeService: EmployeeService,
    private dialog: MatDialog
  ) {
  }

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
    if (
      this.listSelectedEmployees.length === 0 ||
      this.range === -1 ||
      this.dateEnd === undefined
    ) {
      this.showRange = false;
      let msg = '';
      if (this.listSelectedEmployees.length === 0) {
        msg = 'Es sind keine Mitarbeiter ausgewählt';
      } else if (this.range === -1) {
        msg = 'Zeitraum ist nicht korrekt eingetragen';
      } else if (this.dateEnd === undefined) {
        msg = 'Datum ist nicht ausgewählt';
      }
      this.dialog.open(DialogErrorComponent, {
        height: '300px',
        width: '400px',
        data: {
          errorStatus: '',
          action: msg,
        },
      });
    }
    // if datum fehlt
    else {
      this.showRange = true;
      this.dateStart = this.employeeService.getStartDate(
        this.dateEnd,
        this.range
      );
      this.listDataSource = [];

      this.listSelectedEmployees.forEach((e) => {
        let data: TabelleEmployee;
        data = {
          name: e.firstName + ' ' + e.lastName,
          illness: '0',
          overtime: '0',
          vacation: '0',
          specialDay: '0',
          bruttoAT: '0',
          sollAZ: '0',
          istAZ: '0',
          sollPause: '0',
          istPause: '0',
        };

        this.listDataSource.push(data);

        this.employeeService
          .getIllnessByIdAndDate(e.employeeId, this.dateStart, this.range)
          .subscribe(
            (dataID) => {
              data.illness = dataID.illnessDays;
              console.log(
                'succeed getting illness',
                dataID.illnessDays,
                data.illness
              );
            },
            (errorID) => {
              console.log('error getting illness days', errorID.status);
              data.illness = '###';
              this.dialog.open(DialogErrorComponent, {
                height: '300px',
                width: '400px',
                data: {
                  errorStatus: errorID.status,
                  action: 'Getting illness days fehlgeschlagen.',
                },
              });
            }
          );
        this.employeeService
          .getOvertimesByIdAndYear(e.employeeId, this.year)
          .subscribe(
            (dataOT) => {
              data.overtime = dataOT.overtime;
              console.log('succeed getting overtime', dataOT.overtime);
            },
            (errorOT) => {
              data.overtime = '###';
              console.log('error getting overtime', errorOT.status);
              this.dialog.open(DialogErrorComponent, {
                height: '300px',
                width: '400px',
                data: {
                  errorStatus: errorOT.status,
                  action: 'Getting overtime fehlgeschlagen.',
                },
              });
            }
          );
        this.employeeService
          .getVacationByIdAndDate(e.employeeId, this.dateStart, this.range)
          .subscribe(
            (dataRV) => {
              data.vacation = dataRV.remainingVacationOfLastYear;
              console.log(
                'succeed getting vacation',
                dataRV.remainingVacationOfLastYear
              );
            },
            (errorRV) => {
              console.log('error getting vacation', errorRV.status);
              data.vacation = '###';
              this.dialog.open(DialogErrorComponent, {
                height: '300px',
                width: '400px',
                data: {
                  errorStatus: errorRV.status,
                  action: 'Getting vacation fehlgeschlagen.',
                },
              });
            }
          );
        this.employeeService
          .getSpecialDaysByIdAndDate(e.employeeId, this.dateStart, this.range)
          .subscribe(
            (dataSD) => {
              if (dataSD.length > 0) {
                const i = dataSD.findIndex(
                  (dsd) => dsd.employeeId === e.employeeId
                );
                console.log(
                  'succeed getting special days',
                  dataSD[i].specialDays
                );
                data.specialDay = dataSD[i].specialDays;
              } else {
                console.log('special days ist leer');
                data.specialDay = '0';
              }
            },
            (errorSD) => {
              console.log('error getting special days', errorSD.status);
              data.specialDay = '###';
              this.dialog.open(DialogErrorComponent, {
                height: '300px',
                width: '400px',
                data: {
                  errorStatus: errorSD.status,
                  action: 'Getting special days fehlgeschlagen.',
                },
              });
            }
          );
        this.employeeService
          .getHourlyAccount(e.employeeId, this.dateStart, this.range)
          .subscribe(
            (dataHC) => {
              console.log('succeed getting bruttoAT', dataHC.grossWorkingDays),
                console.log(
                  'succeed getting sollAZ',
                  dataHC.targetWorkingHours
                ),
                console.log('succeed getting istAZ', dataHC.actualWorkingHours),
                console.log(
                  'succeed getting sollPause',
                  dataHC.legallyRequiredBreakHours
                ),
                console.log(
                  'succeed getting istPause',
                  dataHC.effectiveBreakHours
                ),
                (data.bruttoAT = dataHC.grossWorkingDays),
                (data.sollAZ = dataHC.targetGrossWorkingHours), // oder targetWorkingHours?
                (data.istAZ = dataHC.actualWorkingHours),
                (data.sollPause = dataHC.legallyRequiredBreakHours),
                (data.istPause = dataHC.effectiveBreakHours);
            },
            (errorHC) => {
              data.bruttoAT = '###';
              data.sollAZ = '###';
              data.istAZ = '###';
              data.sollPause = '###';
              data.istPause = '###';
              console.log('error getting hourly account ', errorHC.status);
              this.dialog.open(DialogErrorComponent, {
                height: '300px',
                width: '400px',
                data: {
                  errorStatus: errorHC.status,
                  action: 'Getting special days fehlgeschlagen.',
                },
              });
            }
          );
      });
    }
  }
}
