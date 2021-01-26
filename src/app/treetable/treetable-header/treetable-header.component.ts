import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-treetable-header',
  templateUrl: './treetable-header.component.html',
  styleUrls: ['./treetable-header.component.scss'],
})
export class TreetableHeaderComponent implements OnInit {
  constructor() {}
  @Input() colOpt;
  @Input() titleH;
  //colOpt = ['datum', 'start', 'end'];
  @Output() addColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() minColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearSearch: EventEmitter<any> = new EventEmitter<any>();
  col = [];

  searched = '';
  ngOnInit(): void {
    this.reset();
  }

  onCheckBoxChanged(event, c: string): void {
    if (event.checked) {
      this.addColumn.emit(c);
    } else {
      this.minColumn.emit(c);
    }
  }

  includedInCol(c): boolean {
    return this.col.includes(c);
  }

  reset(): void {
    this.resetColumn.emit(null);
    this.col = [];
    this.colOpt.forEach((c) => this.col.push(c));
  }

  resetSearch(): void {
    this.clearSearch.emit(null);
    this.searched = '';
  }

  doFilter(value): void {
    this.filter.emit(value);
  }
}
