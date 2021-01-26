import {
  Component,
  Input,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { resourceLimits, threadId } from 'worker_threads';
import { TreeNode } from './treetable-functions';
@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
})
export class TreetableComponent implements OnInit {
  @Input() dataSource: TreeNode[];
  @Input() displayedColumns: string[];
  @Input() titleT;
  @ViewChild(MatSort) sort: MatSort;

  ngAfterViewInit() {}

  flatList = [];
  displayList = [];
  filterList = [];
  maxType = 0;
  tree: TreeNode[] = [];
  spalten = [];
  data;
  open = true;

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns.forEach((col) => this.spalten.push(col));
    this.getFlatList();
    this.displayList = this.flatList.filter((e) => e.type === 1);
    this.getFilterList();
  }

  /**Funktionen für die Filterfunktion */

  filter($event) {
    let pattern = $event.trim().toLocaleLowerCase();
    console.log('pattern', pattern);
    let index = [];
    let filtered = this.filterList.filter((item) => item.includes(pattern));
    filtered.forEach((item) => index.push(this.filterList.indexOf(item)));
    console.log('index :', index);
    console.log('filtered :', filtered);
    this.displayList = [];
    index.forEach((i) => {
      let temp = this.getAll(this.flatList[i]);
      temp.forEach((t) => {
        if (!this.displayList.includes(t)) {
          this.displayList.push(t);
        }
      });
    });
  }

  /**alle Items, die sich in obere(n), und auch gleicher Ebene von item aufklappen*/
  getAll(item): TreeNode[] {
    let result: TreeNode[] = [];
    let index = this.flatList.indexOf(item);
    for (let i = index; i >= 0; i--) {
      if (this.flatList[i].type === 1) {
        result.push(this.flatList[i]);
        break;
      } else {
        result.push(this.flatList[i]);
      }
    }
    for (let i = index + 1; i < this.flatList.length; i++) {
      if (this.flatList[i].type === 1) {
        break;
      } else {
        result.push(this.flatList[i]);
      }
    }
    result = result.filter((i) => i.type <= item.type);
    result.sort(function (a, b) {
      if (a.type < b.type) return -1;
    });
    return result;
  }

  /**eine Liste zurückgeben, die für die Filter Funktion verantwortlich ist
   * die Liste ist vergleichbar mit Flatlist
   * beinhaltet string von jedem Item in Flatlist, die in Tabelle angezeigt wird
   * Leerzeichen weg und alle klein geschrieben
   */
  getFilterList(): void {
    this.flatList.forEach((item) => {
      let s = '';
      if (item.type === 1) {
        s += item.value[0].dateOfDetails;
        s += item.value[0].completePeriod.start;
        s += item.value[0].completePeriod.end;
      } else {
        if (item.type === 2) {
          s += 'Buchung';
        } else {
          s += 'Pause';
        }
        s += item.value[0].period.start;
        s += item.value[0].period.end;
      }
      s = s.trim().toLocaleLowerCase();
      this.filterList.push(s);
    });
  }

  /**zurück zum Anfangszustand ohne Suche */
  clearSearch(): void {
    this.displayList = this.flatList.filter((item) => item.type === 1);
  }

  /**------------------------------------------------------------ */

  /**Spaltenauswahl Funktion */

  /** in displayedColumn verfügbare Spalte hinzufügen*/
  addColumn($event): void {
    this.spalten.push($event);
    console.log('$event');
  }

  /**Spalte löschen */
  minColumn($event): void {
    console.log('min', $event);
    let index = this.spalten.indexOf($event);
    console.log(index);
    if (index !== -1) {
      this.spalten.splice(index, 1);
    }
    console.log(this.spalten);
  }

  /**Spalten wie im Anfangszustand zurücksetzen */
  resetColumn(): void {
    this.spalten = [];
    this.displayedColumns.forEach((col) => this.spalten.push(col));
  }
  /**-------------------------------------------------------------- */

  getFlatList() {
    this.dataSource.forEach((d) => {
      this.flatList.push(d);
      this.recursive(d);
    });
    let max = 0;
    this.flatList.forEach((i) => {
      if (i.type > max) {
        max = i.type;
      }
    });
    this.maxType = max;
  }

  recursive(item): void {
    if (Array.isArray(item.child)) {
      item.child.forEach((b) => {
        this.flatList.push(b);
        this.recursive(b);
      });
    }
  }

  hasChild(item): boolean {
    return this.getChild(item).length > 0;
  }

  getChild(item): any {
    let index = this.flatList.findIndex((e) => e === item);
    return this.flatList[index].child;
  }

  handleClick(item): void {
    if (this.isOpen(item)) {
      this.closeTag(item);
    } else {
      this.openTag(item);
    }
  }

  openTag(item): void {
    let children = this.getChild(item);
    if (children.length > 0) {
      this.displayList = this.flatList.filter(
        (e) => this.displayList.includes(e) || children.includes(e)
      );
    }
  }

  closeTag(item): void {
    let children = [];
    let index = this.flatList.findIndex((e) => e === item);
    for (let i = index + 1; i < this.flatList.length; i++) {
      if (this.flatList[i].type > item.type) {
        children.push(this.flatList[i]);
      } else {
        break;
      }
    }
    if (children.length > 0) {
      this.displayList = this.flatList.filter(
        (e) => this.displayList.includes(e) && !children.includes(e)
      );
    }
  }

  isOpen(item): boolean {
    if (!this.hasChild(item)) {
      return false;
    } else {
      let indexDisplay = this.displayList.findIndex((e) => e === item);
      let indexFlat = this.flatList.findIndex((e) => e === item);
      if (indexDisplay === this.displayList.length - 1) {
        return false;
      } else {
        if (
          this.displayList[indexDisplay + 1] === this.flatList[indexFlat + 1]
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
}
