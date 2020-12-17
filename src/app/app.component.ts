import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timestamp-admin';
  clock;
  date;
  ngOnInit() {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
    this.date = new Date();
  }
}
