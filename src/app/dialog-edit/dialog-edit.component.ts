import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BookingService } from '../service/booking.service';
import { BookComplete } from '../tabelle1/bookingMock';
import { Tabelle1Component } from '../tabelle1/tabelle1.component';
@Component({
  selector: 'app-dialog-edit',
  templateUrl: './dialog-edit.component.html',
  styleUrls: ['./dialog-edit.component.scss'],
})
export class DialogEditComponent implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      day: BookComplete;
      book: BookComplete;
      break: BookComplete;
      bookType: string;
      id: number;
      listComplete;
      listDisplay;
    },
    private dialogRef: MatDialogRef<DialogEditComponent>,
    private bookingService: BookingService
  ) {}

  inputBuchung;
  ngOnInit(): void {}

  handleClickDelete(id: number): void {
    // this.bookingService.deleteBookingByBookingId(bookingId).subscribe(
    //   (data) => {
    //     console.log(data);
    //   },
    //   (error) => {
    //     console.log(error.status);
    //   }
    // );
  }
}
