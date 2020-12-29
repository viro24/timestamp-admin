import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';

import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import bookingMock, { Book } from '../tabelle1/bookingMock';
import { BookingService } from '../service/booking.service';
import { BreakService } from '../service/break.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  listOfEmployee;

  currentEmployeeId;
  dateStart;
  dateEnd;
  dateStartDisplay;
  dateEndDisplay;
  showRange: boolean;

  bookingData;
  listComplete: Book[];
  listDisplay: Book[];

  inputStart;
  inputEnd;

  /**die Spalten der Tabelle */
  displayColumns: string[] = [
    'datum',
    'start',
    'end',
    'action',
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
    //this.getEmployees();
    this.bookingData = bookingMock;
    this.generateDatasource();
    this.listDisplay = this.listComplete.filter(
      (e) => this.getType(e.id) === 1
    );
  }

  /**get all employees */
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

  /**Filter der eingegebenen Inputs */
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
      this.getBookingData();
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
          this.listDisplay = this.listComplete.filter(
            (e) => this.getType(e.id) === 1
          );
          //this.listDisplay = this.listComplete;
          console.log('succeed getting bookingData');
          console.log(this.listComplete);
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
  /**formatting the millisecond
   * to format HH:mm for column :
   * istAZ, sollAZ, istPause, sollPause, überstunden
   */
  dateFormat(date: string): string {
    const dateAbs = Math.abs(+date);
    const dateNum = dateAbs / 1000;
    const hour = Math.floor(dateNum / 3600);
    const minute = (dateNum % 3600) / 60;
    let result = '';
    if (hour < 10) {
      result += '0';
    }
    result += hour.toString() + ':';
    if (minute < 10) {
      result += '0';
    }
    result += minute.toString();
    if (+date >= 0) {
      return result;
    } else {
      return '-' + result;
    }
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
    this.setEditableFalse();
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

  /*EDITTING DATA : KORREKTURFUNKTION */

  setEditableFalse(): void {
    this.listComplete.forEach((e) => (e.editable = false));
  }

  /**edit item : the function that will be called
   * if one press the edit icon next to one book/break item.
   * the edit icon will be done (check) icon.
   * the selected item will be editable,
   * so the two input boxes are to be seen.
   */
  editItem(id: number): void {
    this.inputStart = this.listComplete[id].start.toString().substr(11, 5);
    this.inputEnd = this.listComplete[id].end.toString().substr(11, 5);
    this.setEditableFalse();
    const list = this.listComplete;
    list.forEach((elem) => {
      if (elem.id === id) {
        elem.editable = true;
      }
    });
    this.listComplete = list;
  }

  /**done edit : the function that will be called
   * if one press the done (check) icon.
   * the start and end time will be updated.
   * all items will be set not editable,
   * so no input box is seen.
   */
  doneEdit(id: number): void {
    const bookingId = this.listComplete[id].info.bookID;
    const selected = this.listComplete[id];
    let breakId;
    if (this.getType(selected.id) === 3) {
      breakId = this.listComplete[id].info.breakID;
    }
    this.setEditableFalse();
    const dateStart = new Date(
      selected.dateOfDetails + ' ' + this.inputStart + ' ' + 'UTC'
    ).toJSON();
    const dateEnd = new Date(
      selected.dateOfDetails + ' ' + this.inputEnd + ' ' + 'UTC'
    ).toJSON();
    // const dateStart1 = new Date(
    //   this.getDateOfBooking(id) + ' ' + this.inputStart + ' ' + 'UTC'
    // ).toJSON();
    // const dateEnd = new Date(
    //   this.getDateOfBooking(id) + ' ' + this.inputEnd + ' ' + 'UTC'
    // ).toJSON();

    if (this.getType(selected.id) === 2) {
      this.bookingService
        .editBookingByBookingId(
          bookingId,
          this.currentEmployeeId,
          dateStart,
          dateEnd,
          'OFFICE'
        )
        .subscribe(
          (data) => {
            console.log('Succeed edit book');
            this.updateBookingDataAfterEdit();
          },
          (error) => {
            console.log('Error edit book ', error.status);
          }
        );
    } else {
      this.breakService
        .editBreakByBreakId(breakId, bookingId, dateStart, dateEnd)
        .subscribe(
          (data) => {
            console.log('succeed edit break');
            this.updateBookingDataAfterEdit();
          },
          (error) => {
            console.log('error edit break ', error.status);
          }
        );
    }
    this.inputEnd = null;
    this.inputStart = null;
  }

  deleteItem(id: number): void {
    const selectedItem = this.listComplete[id];
    if (this.getType(selectedItem.id) === 2) {
      this.bookingService
        .deleteBookingByBookingId(selectedItem.info.bookID)
        .subscribe(
          (data) => {
            console.log('succeed deleting booking ');
            this.updateBookingDataAfterDeleteBook(id);
          },
          (error) => console.log('Error deleting booking ', error.status)
        );
    } else {
      //selectedItem from type break
      console.log(selectedItem.info.breakID);
      this.breakService
        .deleteBreakByBreakId(selectedItem.info.breakID)
        .subscribe(
          (data) => {
            console.log('succeed deleting break ');
            this.updateBookingDataAfterDeletePause(id);
          },
          (error) => console.log('Error deleting break ', error.status)
        );
    }
  }
  /* updating booking data after edit (without deleting any element)
   * then generate the listComplete
   * then update listDisplay,
   * exactly like the old listDisplay but with edited data.
   */
  updateBookingDataAfterEdit(): void {
    this.employeeService
      .getBookingbyId(this.currentEmployeeId, this.dateStart, this.dateEnd)
      .subscribe(
        (data) => {
          const indexOldDisplay = [];
          this.listDisplay.forEach((e) => indexOldDisplay.push(e.id));
          console.log('succeed update booking data after editing');
          this.bookingData = data;
          this.generateDatasource();
          this.listDisplay = [];
          indexOldDisplay.forEach((index) =>
            this.listDisplay.push(this.listComplete[index])
          );
        },
        (error) => {
          console.log('error update booking data after editing', error.status);
        }
      );
  }

  /**updating booking data after deleting one pause
   * then generate listComplete
   * update listDisplay
   */
  updateBookingDataAfterDeletePause(id: number): void {
    const temp = this.listDisplay.filter((e) => e !== this.listComplete[id]);
    this.employeeService
      .getBookingbyId(this.currentEmployeeId, this.dateStart, this.dateEnd)
      .subscribe(
        (data) => {
          console.log('succeed update bookingdata after deleting pause');
          this.bookingData = data;
          this.generateDatasource();
          this.listDisplay = [];
          temp.forEach((e) => {
            const displayItem = this.listComplete.find(
              (item) =>
                item.info.bookID === e.info.bookID &&
                item.info.breakID === e.info.breakID &&
                item.dateOfDetails === e.dateOfDetails
            );
            this.listDisplay.push(displayItem);
          });
        },
        (error) => {
          console.log(
            'error update bookingdata after deleting pause',
            error.status
          );
        }
      );
  }

  /**updating booking data after deleting one book
   * generate listComplete
   * update listDisplay
   */

  updateBookingDataAfterDeleteBook(id: number): void {
    const deletedItem = this.listComplete[id];
    //filter the book, and all the pause inside it
    const temp = this.listDisplay.filter(
      (e) =>
        e.position.day !== deletedItem.position.day ||
        e.position.book !== deletedItem.position.book
    );
    console.log(temp);
    //this.listDisplay = temp;
    this.employeeService
      .getBookingbyId(this.currentEmployeeId, this.dateStart, this.dateEnd)
      .subscribe(
        (data) => {
          console.log('succeed update bookingdata after deleting one book');
          this.bookingData = data;
          this.generateDatasource();
          this.listDisplay = [];
          temp.forEach((e) => {
            const displayItem = this.listComplete.find(
              (item) =>
                item.info.bookID === e.info.bookID &&
                item.dateOfDetails === e.dateOfDetails
            );
            console.log(displayItem);
            if (displayItem !== undefined) {
              this.listDisplay.push(displayItem);
            }
          });
        },
        (error) => {
          console.log(
            'error update bookingdata after deleting one book',
            error.status
          );
        }
      );
  }
}
