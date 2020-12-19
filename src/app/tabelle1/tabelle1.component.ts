import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { mockTree } from '../treetable/mocks/mockTree';
import { mockTreeAsArrayOfNodes } from '../treetable/mocks/mockTreeAsArrayOfNodes';
import { mockBookingList } from '../treetable/mocks/mockBookingList';
import { bookComplete } from './bookingMock';

import FransMock from './bookingMock';

@Component({
  selector: 'app-tabelle1',
  templateUrl: './tabelle1.component.html',
  styleUrls: ['./tabelle1.component.scss'],
})
export class Tabelle1Component implements OnInit {
  employees: any[];
  currentEmployeeId;
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
    'overtime',
  ];
  bookingData;
  treeData = mockBookingList;
  showRange: boolean = false;
  listComplete: bookComplete[]; //die komplette, flache liste des Tages bzw. der Buchung bzw. der Pausen
  listDisplay: bookComplete[];

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  isOpen(id: number) {
    var selected = this.listComplete[id];
    var type = selected.type;
    if (type !== 'break') {
      var index = this.listDisplay.findIndex((e) => e === selected);
      if (index === this.listDisplay.length - 1) return false;
      else {
        if (type === 'day') {
          if (this.listDisplay[index + 1].type === 'day') return false;
          else return true;
        }
        if (type === 'book') {
          if (this.listDisplay[index + 1].type === 'break') return true;
          else return false;
        }
      }
    }
  }
  handleClick(id: number) {
    var selected = this.listComplete[id];
    if (selected.type === 'day') {
      console.log('day', this.isOpen(id));
      if (this.isOpen(id)) {
        console.log('day is open, lets close');
        this.closeDay(id);
      } else this.openDay(id);
    } else if (selected.type === 'book') {
      console.log('book', this.isOpen(id));
      if (this.isOpen(id)) this.closeBook(id);
      else this.openBook(id);
    } else console.log('pause');
  }

  closeDay(id: number) {
    var selected = this.listComplete[id];
    this.listDisplay = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) &&
        (e.tag !== selected.tag || e.buchung === 0)
    );
  }

  closeBook(id: number) {
    var selected = this.listComplete[id];
    var temp = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) &&
        (e.buchung !== selected.buchung || e.pause === 0)
    );
    this.listDisplay = temp;
  }

  openDay(id: number) {
    //OK
    var selectedDay = this.listComplete[id];
    var temp = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) ||
        (e.tag === selectedDay.tag && e.pause === 0)
    );
    this.listDisplay = temp;
  }

  openBook(id: number) {
    //OK
    var selectedBook = this.listComplete[id];
    var temp = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) ||
        (e.buchung === selectedBook.buchung && e.tag === selectedBook.tag)
    );
    this.listDisplay = temp;
  }

  handleClickFilter(): void {
    if (
      this.currentEmployeeId === undefined ||
      this.dateStart === undefined ||
      this.dateEnd === undefined
    ) {
      this.showRange = false;
      var msg = '';
      if (this.currentEmployeeId === undefined)
        msg = 'Bitte wählen Sie einen Mitarbeiter aus.';
      else msg = 'Bitte wählen Sie das Start- und Enddatum.';
      this.dialog.open(DialogErrorComponent, {
        height: '300px',
        width: '400px',
        data: {
          errorStatus: '',
          action: msg,
        },
      });
    } else {
      this.showRange = true;
      this.getBookingData();
      this.generateDatasource;
    }
  }

  /**get all employees */
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
      .getBookingbyId(this.currentEmployeeId, this.dateStart, this.dateEnd)
      .subscribe(
        (data) => {
          this.bookingData = data;
          this.generateDatasource();
          console.log(this.listComplete);
          this.listDisplay = this.listComplete.filter((e) => e.type === 'day');
          //this.listDisplay = this.listComplete.filter((e) => e.type === 'day');
          console.log('succeed getting bookingData');
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

  handleClickNavi2() {
    this.router.navigateByUrl('/tabelle-2');
  }
  handleClickNavi3() {
    this.router.navigateByUrl('/tabelle-3');
  }

  generateDatasource() {
    this.listComplete = [];
    console.log(this.bookingData);
    var itemID: number = 0;
    this.bookingData.forEach((day, index) => {
      var dataDay: bookComplete;
      dataDay = {
        datum: null,
        type: null,
        start: null,
        end: null,
        id: null,
        sollAZ: null,
        istAZ: null,
        sollPause: null,
        istPause: null,
        ueberstunden: null,
        tag: index + 1,
        buchung: 0,
        pause: 0,
      };
      this.listComplete.push(dataDay);
      dataDay.datum = day.dateOfDetails;
      dataDay.type = 'day';
      dataDay.start = day.completePeriod.start;
      dataDay.end = day.completePeriod.end;
      dataDay.id = itemID;
      itemID = itemID + 1;
      dataDay.sollAZ = day.targetWorkingTimeInMillis;
      dataDay.istAZ = day.dailyBookingTimeInMillisReal;
      dataDay.sollPause = day.dailyBreakTimeInMillisEffective;
      dataDay.istPause = day.dailyBreakTimeInMillisReal;
      dataDay.ueberstunden = day.overtimeInMillis;
      if (day.bookingsList.length > 0) {
        console.log('Hallo');
        day.bookingsList.forEach((book) => {
          var buchungsIndex = 0;
          buchungsIndex = buchungsIndex + 1;
          var dataBook: bookComplete;
          dataBook = {
            datum: null,
            type: null,
            start: null,
            end: null,
            id: null,
            sollAZ: null,
            istAZ: null,
            sollPause: null,
            istPause: null,
            ueberstunden: null,
            tag: index + 1,
            buchung: buchungsIndex,
            pause: 0,
          };
          //buchungsIndex = buchungsIndex + 1;
          this.listComplete.push(dataBook);
          dataBook.datum = 'Buchung';
          dataBook.type = 'book';
          dataBook.start = book.period.start;
          dataBook.end = book.period.end;
          dataBook.id = itemID;
          itemID = itemID + 1;
          if (book.breakList.length > 0) {
            console.log('Breaklist');
            book.breakList.forEach((pause) => {
              var pausenIndex = 1;
              var dataBreak: bookComplete;
              dataBreak = {
                datum: null,
                type: null,
                start: null,
                end: null,
                id: null,
                sollAZ: null,
                istAZ: null,
                sollPause: null,
                istPause: null,
                ueberstunden: null,
                tag: index + 1,
                buchung: buchungsIndex,
                pause: pausenIndex,
              };
              pausenIndex = pausenIndex + 1;
              this.listComplete.push(dataBreak);
              dataBreak.datum = 'Pause';
              dataBreak.type = 'break';
              dataBreak.start = pause.period.start;
              dataBreak.end = pause.period.end;
              dataBreak.id = itemID;
              itemID = itemID + 1;
            });
          }
        });
      }
    });
  }
}
