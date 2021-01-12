import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BookingService } from '../service/booking.service';
import { Book } from '../tabelle1/bookingMock';
import { getISODate } from '../overview/functionOverview';
import { BreakService } from '../service/break.service';

@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],
})
export class DialogEditComponent implements OnInit {
  listComplete = this.data.list.filter(
    (e) => e.position.book !== 0 || e.position.break !== 0
  );
  day = this.data.list.find(
    (e) => e.position.book === 0 && e.position.break === 0
  ); //der dazugehörige Tag der aktuellen Buchung(/Pause/Tag)
  inputStart: string;
  inputEnd: string;
  inputLocation = 'OFFICE';
  column = ['angabe', 'start', 'end'];
  listLocation = ['OFFICE', 'HOMEOFFICE', 'EXTERNAL'];
  selectedItem = this.data.selectedItem;
  employeeId = this.data.employeeId;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: { list: Book[]; selectedItem: Book; employeeId: string },
    private dialogRef: MatDialogRef<DialogEditComponent>,
    private bookingService: BookingService,
    private breakService: BreakService
  ) {}

  ngOnInit(): void {}

  getTitle(book: Book): string {
    if (book.position.break === 0) {
      return book.position.book + '. Buchung';
    } else {
      return book.position.break + '. Pause';
    }
  }

  addBooking(): void {
    let bookingStart = getISODate(this.day.dateOfDetails, this.inputStart);
    let bookingEnd = getISODate(this.day.dateOfDetails, this.inputEnd);
    if (
      this.selectedItem.position.break === 0 &&
      this.selectedItem.position.book === 0
    ) {
      //add Buchung
      this.bookingService
        .addBooking(
          this.employeeId,
          bookingStart,
          bookingEnd,
          this.inputLocation
        )
        .subscribe(
          (dataAddBooking) => {
            console.log('Add boooking succeed');
            this.dialogRef.close();
          },
          (errorAddBooking) => {
            console.log('Error add booking ', errorAddBooking.status);
          }
        );
    } else if (
      this.selectedItem.position.book !== 0 &&
      this.selectedItem.position.break === 0
    ) {
      //add Pause
      this.breakService
        .addBreak(this.selectedItem.info.bookID, bookingStart, bookingEnd)
        .subscribe(
          (dataAddBreak) => {
            console.log('Add break succeed');
            this.dialogRef.close();
          },
          (errorAddBreak) => {
            console.log('Error add break', errorAddBreak.status);
          }
        );
    }
  }

  deleteItem(): void {
    if (
      this.selectedItem.position.book !== 0 &&
      this.selectedItem.position.break === 0
    ) {
      //delete book
      let bookId = this.selectedItem.info.bookID;
      this.bookingService.deleteBookingByBookingId(bookId).subscribe(
        (data) => {
          console.log('Delete book succeed');
          this.dialogRef.close();
        },
        (error) => {
          console.log('Error delete book', error.status);
        }
      );
    } else if (
      this.selectedItem.position.book !== 0 &&
      this.selectedItem.position.break !== 0
    ) {
      //delete break
      let breakId = this.selectedItem.info.breakID;
      this.breakService.deleteBreakByBreakId(breakId).subscribe(
        (data) => {
          console.log('Delete break succeed');
          this.dialogRef.close();
        },
        (error) => {
          console.log('error delete break', error.status);
        }
      );
    }
  }

  editItem(): void {
    let bookingStart = getISODate(this.day.dateOfDetails, this.inputStart);
    let bookingEnd = getISODate(this.day.dateOfDetails, this.inputEnd);
    if (
      this.selectedItem.position.book !== 0 &&
      this.selectedItem.position.break === 0
    ) {
      //edit book
      let bookId = this.selectedItem.info.bookID;
      this.bookingService
        .editBookingByBookingId(
          bookId,
          this.employeeId,
          bookingStart,
          bookingEnd,
          this.inputLocation
        )
        .subscribe(
          (data) => {
            console.log('edit book succeed');
            this.dialogRef.close();
          },
          (error) => {
            console.log('error edit book', error.status);
          }
        );
    } else if (
      this.selectedItem.position.book !== 0 &&
      this.selectedItem.position.break !== 0
    ) {
      //edit break
      let breakId = this.selectedItem.info.breakID;
      this.breakService
        .editBreakByBreakId(breakId, bookingStart, bookingEnd)
        .subscribe(
          (data) => {
            console.log('edit break succeed');
            this.dialogRef.close();
          },
          (error) => {
            console.log('error edit break', error.status);
          }
        );
    }
  }
}
