import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dialog-error',
  templateUrl: './dialog-error.component.html',
  styleUrls: ['./dialog-error.component.scss'],
})
export class DialogErrorComponent implements OnInit {
  // @HostListener('click') onClick() {
  //   this.afterIdle();
  // }
  // @HostListener('mouseover') onMouseover() {
  //   this.afterIdle();
  // }

  idle: any;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA)
    public data: { action: string; errorStatus: string },
    private dialogRef: MatDialogRef<DialogErrorComponent>
  ) {
  }

  ngOnInit(): void {
  }

  // ngOnDestroy(): void {
  //   clearTimeout(this.idle);
  // }
  // afterIdle(): void {
  //   clearTimeout(this.idle);
  //   this.setNewIdle();
  // }

  // setNewIdle(): void {
  //   clearTimeout(this.idle);
  //   this.idle = setTimeout(() => {
  //     this.dialogRef.close();
  //   }, 7000);
  // }
}
