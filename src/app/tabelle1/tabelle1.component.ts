import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';
import { BookComplete } from './bookingMock';
import { BookingService } from '../service/booking.service';
import { BreakService } from '../service/break.service';
import bookingMock, { Book } from '../tabelle1/bookingMock';

@Component({
  selector: 'app-tabelle1',
  templateUrl: './tabelle1.component.html',
  styleUrls: ['./tabelle1.component.scss'],
})
export class Tabelle1Component implements OnInit {
  employees: any[]; //Die Liste der Mitarbeiter zum Auswählen
  currentEmployeeId; //der ausgewählte Mitarbeiter --> wird eingegeben
  dateStart; //der ausgewählte Start(datum) --> wird eingegeben
  dateEnd; //der ausgewählte End(datum) --> wird eingegeben
  dateStartDisplay;
  dateEndDisplay;
  showRange = false;

  /**die Spalten der Tabelle */
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

  bookingData; //die direkte Liste aus Backend
  listComplete: BookComplete[]; //die komplette, flache liste des Tages bzw. der Buchung bzw. der Pausen
  listDisplay: BookComplete[]; //die anzuzeigende Liste
  inputStart = null; //binding to edit start time
  inputEnd = null; //binding to edit end time

  constructor(
    private employeeService: EmployeeService,
    public dialog: MatDialog,
    private bookingService: BookingService,
    private breakService: BreakService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
    // this.bookingData = bookingMock;
    // this.generateDatasource();
    // this.listDisplay = this.listComplete.filter((e) => e.type === 'day');
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

  /** generate the complete list as this.listComplete
   * to get a treetable from backend data
   */
  generateDatasource(): void {
    this.listComplete = [];
    let itemID = 0;
    this.bookingData.forEach((day, dayIndex) => {
      let dataDay: BookComplete;
      dataDay = {
        datum: day.dateOfDetails,
        type: null,
        start: null,
        end: null,
        id: null,
        sollAZ: null,
        istAZ: null,
        sollPause: null,
        istPause: null,
        ueberstunden: null,
        tag: dayIndex + 1,
        buchung: 0,
        pause: 0,
        bookID: -1,
        breakID: -1,
        editable: false,
      };
      this.listComplete.push(dataDay);
      //dataDay.datum = day.dateOfDetails;
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
        day.bookingsList.forEach((book, bookIndex) => {
          let dataBook: BookComplete;
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
            tag: dayIndex + 1,
            buchung: bookIndex + 1,
            pause: 0,
            bookID: -1,
            breakID: -1,
            editable: false,
          };
          this.listComplete.push(dataBook);
          dataBook.bookID = book.bookingId;
          dataBook.datum = 'Buchung';
          dataBook.type = 'book';
          dataBook.start = book.period.start;
          dataBook.end = book.period.end;
          dataBook.id = itemID;
          itemID = itemID + 1;
          if (book.breakList.length > 0) {
            console.log('Breaklist');
            book.breakList.forEach((pause, pausenIndex) => {
              let dataBreak: BookComplete;
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
                tag: dayIndex + 1,
                buchung: bookIndex + 1,
                pause: pausenIndex + 1,
                bookID: -1,
                breakID: -1,
                editable: false,
              };
              this.listComplete.push(dataBreak);
              dataBreak.bookID = pause.bookingId;
              dataBreak.breakID = pause.breakId;
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
          this.listDisplay = this.listComplete.filter((e) => e.type === 'day');
          console.log('succeed getting bookingData');
          console.log(this.bookingData);
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
                item.bookID === e.bookID &&
                item.breakID === e.breakID &&
                item.datum === e.datum
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
      (e) => e.tag !== deletedItem.tag || e.buchung !== deletedItem.buchung
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
              (item) => item.bookID === e.bookID && item.datum === e.datum
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

  /**TREETABLE : checking whether a selected item (day/book/break) is open*/
  isOpen(id: number): boolean {
    const selected = this.listComplete[id];
    const type = selected.type;
    if (type !== 'break') {
      const index = this.listDisplay.findIndex((e) => e === selected);
      if (index === this.listDisplay.length - 1) {
        return false;
      } else {
        if (type === 'day') {
          if (this.listDisplay[index + 1].type === 'day') {
            return false;
          } else {
            return true;
          }
        }
        if (type === 'book') {
          if (this.listDisplay[index + 1].type === 'break') {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  }

  /**TREETABLE :
   * handle every click in item in treetable
   */

  handleClick(id: number): void {
    this.setEditableFalse();
    let selected = this.listComplete[id];
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
  /**TREETABLE :
   *
   * the next 4 methods are used to
   * open and close item (day/book/break)*/
  closeDay(id: number): void {
    const selected = this.listComplete[id];
    this.listDisplay = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) &&
        (e.tag !== selected.tag || e.buchung === 0)
    );
  }

  closeBook(id: number): void {
    const selected = this.listComplete[id];
    const temp = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) &&
        (e.buchung !== selected.buchung || e.pause === 0)
    );
    this.listDisplay = temp;
  }

  openDay(id: number): void {
    const selectedDay = this.listComplete[id];
    const temp = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) ||
        (e.tag === selectedDay.tag && e.pause === 0)
    );
    this.listDisplay = temp;
  }

  openBook(id: number): void {
    const selectedBook = this.listComplete[id];
    const temp = this.listComplete.filter(
      (e) =>
        this.listDisplay.includes(e) ||
        (e.buchung === selectedBook.buchung && e.tag === selectedBook.tag)
    );
    this.listDisplay = temp;
  }

  /**EDITTING DATA----KORREKTURFUNKTION */

  /**getting date of the selected book or break to be edited (day cannot be selected) */
  getDateOfBooking(id: number): any {
    const selectedBook = this.listComplete[id];
    const selectedDay = this.listComplete.find(
      (elem) =>
        elem.tag === selectedBook.tag && elem.buchung === 0 && elem.pause === 0
    );
    return selectedDay.datum;
  }

  /**set all books and breaks as not editable.
   * if one book or break is editable,
   * then two input boxes come,
   * for start and end time.
   */
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
    const bookingId = this.listComplete[id].bookID;
    let breakId;
    if (this.listComplete[id].type === 'break') {
      breakId = this.listComplete[id].breakID;
    }
    this.setEditableFalse();
    const dateStart = new Date(
      this.getDateOfBooking(id) + ' ' + this.inputStart + ' ' + 'UTC'
    ).toJSON();
    const dateEnd = new Date(
      this.getDateOfBooking(id) + ' ' + this.inputEnd + ' ' + 'UTC'
    ).toJSON();

    if (this.listComplete[id].type === 'book') {
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
        .editBreakByBreakId(breakId, dateStart, dateEnd)
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
    const tempListDisplay = this.listDisplay;
  }

  dialogDeleteItem(id: number): void {
    const selectedItem = this.listComplete[id];
    let selectedId;
    if (selectedItem.type === 'book') {
      selectedId = selectedItem.bookID;
    } else {
      selectedId = selectedItem.breakID;
    }
    const day = this.listComplete.find(
      (e) => e.tag === selectedItem.tag && e.buchung === 0 && e.pause === 0
    );
  }

  deleteItem(id: number): void {
    const selectedItem = this.listComplete[id];
    if (selectedItem.type === 'book') {
      this.bookingService
        .deleteBookingByBookingId(selectedItem.bookID)
        .subscribe(
          (data) => {
            console.log('succeed deleting booking ');
            this.updateBookingDataAfterDeleteBook(id);
          },
          (error) => console.log('Error deleting booking ', error.status)
        );
    } else {
      //selectedItem from type break
      console.log(selectedItem.breakID);
      this.breakService.deleteBreakByBreakId(selectedItem.breakID).subscribe(
        (data) => {
          console.log('succeed deleting break ');
          this.updateBookingDataAfterDeletePause(id);
        },
        (error) => console.log('Error deleting break ', error.status)
      );
    }
  }
}
