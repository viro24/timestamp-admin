import {Component, OnInit} from '@angular/core';
import {tree, tree2} from './treetable/treetable-functions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'timestamp-admin';
  clock = new Date();
  date = new Date();
  tree = tree;
  tree2 = tree2;
  col = ['datum', 'start', 'end'];

  ngOnInit() {
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
    this.date = new Date();
  }
}
