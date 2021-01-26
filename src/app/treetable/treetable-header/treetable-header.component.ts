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
  @Output() addColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() minColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() resetColumn: EventEmitter<any> = new EventEmitter<any>();
  @Output() filter: EventEmitter<any> = new EventEmitter<any>();
  @Output() clearSearch: EventEmitter<any> = new EventEmitter<any>();
  col = [];
  searched = '';
  checked = [];

  ngOnInit(): void {
    this.reset();
  }

  onCheckBoxChanged(event, c: string): void {
    const index = this.colOpt.indexOf(c);
    if (event.checked) {
      this.checked[index] = true;
      this.addColumn.emit(c);
    } else {
      this.minColumn.emit(c);
      this.checked[index] = false;
    }
  }

  includedInCol(c): boolean {
    return this.col.includes(c);
  }

  reset(): void {
    this.resetColumn.emit(null);
    this.col = [];
    this.colOpt.forEach((c, i) => {
      this.col.push(c);
      this.checked[i] = true;
    });
  }

  resetSearch(): void {
    this.clearSearch.emit(null);
    this.searched = '';
  }

  doFilter(value): void {
    this.filter.emit(value);
  }
}
