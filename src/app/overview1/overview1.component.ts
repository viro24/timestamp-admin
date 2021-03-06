import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { DialogEditComponent } from '../dialog-edit/dialog-edit.component';
import bookingMock, { Book } from '../tabelle1/bookingMock';
import { BookingService } from '../service/booking.service';
import { BreakService } from '../service/break.service';
import { getListOfDate } from '../overview/functionOverview';

@Component({
  selector: 'app-overview1',
  templateUrl: './overview1.component.html',
  styleUrls: ['./overview1.component.scss'],
})
export class Overview1Component implements OnInit {
  listOfEmployee;

  currentEmployeeId;
  dateStart;
  dateEnd;
  dateStartDisplay;
  dateEndDisplay;
  showRange: boolean;
  afterDialog = false;

  bookingData;
  listComplete: Book[];
  listDisplay: Book[];
  listOfDate: Date[];

  inputStart;
  inputEnd;

  /*die Spalten der Tabelle*/
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

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private bookingService: BookingService,
    private breakService: BreakService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  /*get all employees */
  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.listOfEmployee = data;
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

  /*Filter der eingegebenen Inputs*/
  handleClickFilter(): void {
    if (
      this.currentEmployeeId === undefined ||
      this.dateStart === undefined ||
      this.dateEnd === undefined
    ) {
      this.showRange = false;
      let msg = '';
      if (this.currentEmployeeId === undefined) {
        msg = 'Bitte wählen Sie einen Mitarbeiter aus.';
      } else {
        msg = 'Bitte wählen Sie das Start- und Enddatum.';
      }
      this.dialog.open(DialogErrorComponent, {
        height: '300px',
        width: '400px',
        data: {
          errorStatus: '',
          action: msg,
        },
      });
    } else {
      this.dateStartDisplay = this.dateStart;
      this.dateEndDisplay = this.dateEnd;
      this.showRange = true;
      this.listOfDate = getListOfDate(this.dateStart, this.dateEnd);
      console.log(this.listOfDate);
      this.getBookingData();
    }
  }

  filterListDisplay() {
    if (!this.afterDialog) {
      this.listDisplay = this.listComplete.filter(
        (e) => this.getType(e.id) === 1
      );
    } else {
      let oldDisplay = this.listDisplay;
      this.afterDialog = false;
      //TODO : filter setelah dari tutup dialog
    }
  }

  /**getting bookingData directly from backend,
   * then generate the complete list,
   * and filter the display list to get to treetable
   */
  getBookingData(): void {
    this.employeeService
      .getBookingbyId(this.currentEmployeeId, this.dateStart, this.dateEnd)
      .subscribe(
        (data) => {
          this.bookingData = data;
          this.generateDatasource();
          this.getListComplete();
          this.filterListDisplay();
          if (this.bookingData.length === 0) {
            this.dialog.open(DialogErrorComponent, {
              height: '300px',
              width: '400px',
              data: {
                action:
                  'Es befindet sich keine Buchungen in dem eingegebenen Zeitraum.',
              },
            });
          }
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

  getListComplete(): void {
    this.listComplete = [];
    let index = -1;
    this.listOfDate.forEach((date) => {
      const bookingDay = this.bookingData.find(
        (b) =>
          parseInt(b.dateOfDetails.substring(0, 4), 10) ===
            date.getFullYear() &&
          parseInt(b.dateOfDetails.substring(5, 7), 10) ===
            date.getMonth() + 1 &&
          parseInt(b.dateOfDetails.substring(8, 10), 10) === date.getDate()
      );
      console.log('bookingDay: ', bookingDay);
      const dataDay: Book = {
        dateOfDetails: date,
        id: index + 1,
        position: { day: -1, book: 0, break: 0 },
        start: null,
        end: null,
        editable: false,
        info: {
          sollAZ: null,
          istAZ: null,
          sollPause: null,
          istPause: null,
          ueberstunden: null,
          bookID: null,
          breakID: null,
        },
      };
      index = index + 1;
      if (bookingDay !== undefined) {
        const indexDay = this.bookingData.findIndex((b) => b === bookingDay);
        console.log('Found!', indexDay);
        dataDay.position.day = indexDay + 1;
        dataDay.start = bookingDay.completePeriod.start;
        dataDay.end = bookingDay.completePeriod.end;
        dataDay.info.sollAZ = bookingDay.targetWorkingTimeInMillis;
        dataDay.info.istAZ = bookingDay.dailyBookingTimeInMillisReal;
        dataDay.info.sollPause = bookingDay.dailyBreakTimeInMillisEffective;
        dataDay.info.istPause = bookingDay.dailyBreakTimeInMillisReal;
        dataDay.info.ueberstunden = bookingDay.overtimeInMillis;
        this.listComplete.push(dataDay);
        if (bookingDay.bookingsList.length > 0) {
          bookingDay.bookingsList.forEach((book, indexBook) => {
            const dataBook: Book = {
              dateOfDetails: date,
              id: index + 1,
              position: { day: indexDay + 1, book: indexBook + 1, break: 0 },
              start: book.period.start,
              end: book.period.end,
              editable: false,
              info: {
                sollAZ: null,
                istAZ: null,
                sollPause: null,
                istPause: null,
                ueberstunden: null,
                bookID: book.bookingId,
                breakID: null,
              },
            };
            index = index + 1;
            this.listComplete.push(dataBook);
            if (book.breakList.length > 0) {
              book.breakList.forEach((breaks, indexBreak) => {
                const dataBreak: Book = {
                  dateOfDetails: date,
                  id: index + 1,
                  position: {
                    day: indexDay + 1,
                    book: indexBook + 1,
                    break: indexBreak + 1,
                  },
                  start: breaks.period.start,
                  end: breaks.period.end,
                  editable: false,
                  info: {
                    sollAZ: null,
                    istAZ: null,
                    sollPause: null,
                    istPause: null,
                    ueberstunden: null,
                    bookID: book.bookingId,
                    breakID: breaks.breakId,
                  },
                };
                index = index + 1;
                this.listComplete.push(dataBreak);
              });
            }
          });
        }
      } else {
        this.listComplete.push(dataDay);
      }
    });
  }

  /*
   * convert the data in bookingData to listComplete,
   * that is a flat list of bookingData,
   * which contains element of Book interface.
   * This list, together with listDisplay, are necessary for our treetable.
   * From now on we display the items with listDisplay,
   * and take other elements possible from listComplete.
   */
  generateDatasource(): void {
    this.listComplete = [];
    let itemID = -1;
    this.bookingData.forEach((data, index) => {
      let dataDay: Book;
      dataDay = {
        dateOfDetails: data.dateOfDetails,
        id: itemID + 1,
        position: { day: index + 1, book: 0, break: 0 },
        start: data.completePeriod.start,
        end: data.completePeriod.end,
        editable: false,
        info: {
          sollAZ: data.targetWorkingTimeInMillis,
          istAZ: data.dailyBookingTimeInMillisReal,
          sollPause: data.dailyBreakTimeInMillisEffective,
          istPause: data.dailyBreakTimeInMillisReal,
          ueberstunden: data.overtimeInMillis,
          bookID: null,
          breakID: null,
        },
      };
      itemID = itemID + 1;
      this.listComplete.push(dataDay);
      if (data.bookingsList.length > 0) {
        data.bookingsList.forEach((dBook, bookIndex) => {
          let dataBook: Book;
          dataBook = {
            dateOfDetails: data.dateOfDetails,
            id: itemID + 1,
            position: {
              day: index + 1,
              book: bookIndex + 1,
              break: 0,
            },
            start: dBook.period.start,
            end: dBook.period.end,
            editable: false,
            info: {
              sollAZ: null,
              istAZ: null,
              sollPause: null,
              istPause: null,
              ueberstunden: null,
              bookID: dBook.bookingId,
              breakID: null,
            },
          };
          itemID = itemID + 1;
          this.listComplete.push(dataBook);
          if (dBook.breakList.length > 0) {
            dBook.breakList.forEach((dBreak, breakIndex) => {
              let dataBreak: Book;
              dataBreak = {
                dateOfDetails: data.dateOfDetails,
                id: itemID + 1,
                position: {
                  day: index + 1,
                  book: bookIndex + 1,
                  break: breakIndex + 1,
                },
                start: dBreak.period.start,
                end: dBreak.period.end,
                editable: false,
                info: {
                  sollAZ: null,
                  istAZ: null,
                  sollPause: null,
                  istPause: null,
                  ueberstunden: null,
                  bookID: dBook.bookingId,
                  breakID: dBreak.breakId,
                },
              };
              itemID = itemID + 1;
              this.listComplete.push(dataBreak);
            });
          }
        });
      }
    });
  }

  /**check whether an element of listComplete is
   * a day-type ( return 1)
   * a book-type ( return 2)
   * or a break-type (return 3)
   */
  getType(id: number): number {
    const selected = this.listComplete[id].position;
    if (selected.book === 0 && selected.break === 0) {
      return 1;
    } else if (selected.book !== 0 && selected.break === 0) {
      return 2;
    } else if (selected.book !== 0 && selected.break !== 0) {
      return 3;
    } else {
      return -1;
    }
  }

  /* TREETABLE :
   * check, wheather an item is opened
   * , hence, wheather an item can be opened or not
   */
  isOpened(id: number): boolean {
    const selected = this.listComplete[id];
    const type = this.getType(selected.id);
    if (type !== 3) {
      const index = this.listDisplay.findIndex((e) => e === selected);
      if (index === this.listDisplay.length - 1) {
        return false;
      } else {
        if (type === 1) {
          if (this.getType(this.listDisplay[index + 1].id) === 1) {
            return false;
          } else {
            return true;
          }
        }
        if (type === 2) {
          if (this.getType(this.listDisplay[index + 1].id) === 3) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }

  /**TREETABLE :
   * handleClick every single item
   * in column 'Angabe'
   */
  handleClick(id: number): void {
    if (this.isOpened(id)) {
      this.close(id);
    } else {
      this.open(id);
    }
  }

  /**TREETABLE :
   * close an opened item
   */
  close(id: number): void {
    const pos = this.listComplete[id].position;
    if (this.getType(id) === 1) {
      this.listDisplay = this.listComplete.filter(
        (e) =>
          this.listDisplay.includes(e) &&
          (e.position.day !== pos.day || e.position.book === 0)
      );
    } else {
      this.listDisplay = this.listComplete.filter(
        (e) =>
          this.listDisplay.includes(e) &&
          (e.position.book !== pos.book || e.position.break === 0)
      );
    }
  }

  /**TREETABLE :
   * open a closed item
   */
  open(id: number): void {
    const pos = this.listComplete[id].position;
    if (this.getType(id) === 1) {
      const temp = this.listComplete.filter(
        (e) =>
          this.listDisplay.includes(e) ||
          (e.position.day === pos.day && e.position.break === pos.break)
      );
      this.listDisplay = temp;
    } else {
      const temp = this.listComplete.filter(
        (e) =>
          this.listDisplay.includes(e) ||
          (e.position.book === pos.book && e.position.day === pos.day)
      );
      this.listDisplay = temp;
    }
  }

  /**EDITTING DATA 1 : Korrekturfunktion */

  openEditDialog(id: number): void {
    this.afterDialog = true;
    const selectedItem = this.listComplete[id];
    if (selectedItem.position.day === -1) {
      //open dialog to add book
    } else {
      let dayItems = this.getAllItemInDay(id);
      this.dialog
        .open(DialogEditComponent, {
          height: '55%',
          width: '50%',
          data: {
            list: dayItems,
            selectedItem: selectedItem,
            employeeId: this.currentEmployeeId,
          },
        })
        .afterClosed()
        .subscribe(() => this.getBookingData());
    }
  }

  getAllItemInDay(id: number): any {
    const selectedItem = this.listComplete[id];
    const day = selectedItem.position.day;
    const result = this.listComplete.filter(
      (item) => item.position.day === day
    );
    return result;
  }
}
