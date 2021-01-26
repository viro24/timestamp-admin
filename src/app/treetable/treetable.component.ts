import { Component, Input, OnInit } from '@angular/core';
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

  ngAfterViewInit() {}

  flatList = [];
  displayList = [];
  filterList = [];
  maxType = 0;
  spalten = [];
  data;
  open = [];
  found = [];

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns.forEach((col) => this.spalten.push(col));
    this.getFlatList();
    this.displayList = this.flatList.filter((e) => e.type === 1);
    this.getFilterList();
  }

  /**-------------------------------------------------------------------------------------------- */

  /**Funktionen zum Generieren aller notwendigen Variablen und Funktionen fürs Treetable */

  /** generiert die flache Liste */
  getFlatList(): void {
    this.dataSource.forEach((d) => {
      this.flatList.push(d);
      this.recursive(d);
    });
    let max = 0;
    this.flatList.forEach((i) => {
      if (i.type > max) {
        max = i.type;
      }
      this.open.push(false);
    });
    this.maxType = max;
  }

  /**rekursive Funktion für getFlatList() */
  recursive(item): void {
    if (Array.isArray(item.child)) {
      item.child.forEach((b) => {
        this.flatList.push(b);
        this.recursive(b);
      });
    }
  }

  /**gibt zurück, ob ein Item (aus flatList/displayList) Kinder hat */
  hasChild(item): boolean {
    return this.getChild(item).length > 0;
  }

  /**gibt die dazugehörigen Kinder des eingegebenen Items */
  getChild(item): TreeNode[] {
    let index = this.flatList.findIndex((e) => e === item);
    return this.flatList[index].child;
  }

  /**die Funktion, die aufgerufen wird,
   * wenn man an einem Item in der Tabelle klickt.
   * Das Item wird je nach Zustand
   * auf- oder zugeklappt.
   */
  handleClick(item): void {
    if (this.hasChild(item)) {
      if (this.isOpen(item)) {
        this.closeTag(item);
      } else {
        this.openTag(item);
      }
    } else {
      const index = this.flatList.indexOf(item);
      this.open[index] = !this.open[index];
    }
  }

  /**Aufklappen eines Items in der Tabelle */
  openTag(item): void {
    let children = this.getChild(item);
    if (children.length > 0) {
      this.displayList = this.flatList.filter(
        (e) => this.displayList.includes(e) || children.includes(e)
      );
    }
  }

  /**Zuklappen eines Items in der Tabelle */
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

  /**gibt zurück, ob ein Item gerade aufgeklappt ist. */
  isOpen(item): boolean {
    if (!this.hasChild(item)) {
      return this.open[this.flatList.indexOf(item)];
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

  /**------------------------------------------------------------------------------ */

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
    let highlighted = [];
    index.forEach((i) => {
      let h = this.displayList.indexOf(this.flatList[i]);
      highlighted.push(h);
    });
    this.found = highlighted;
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
        s += item.value[0].completePeriod.start.substring(11, 16);
        s += item.value[0].completePeriod.end.substring(11, 16);
      } else {
        if (item.type === 2) {
          s += 'Buchung';
        } else {
          s += 'Pause';
        }
        s += item.value[0].period.start.substring(11, 16);
        s += item.value[0].period.end.substring(11, 16);
      }
      s = s.trim().toLocaleLowerCase();
      this.filterList.push(s);
    });
  }

  /**zurück zum Anfangszustand ohne Suche */
  clearSearch(): void {
    this.displayList = this.flatList.filter((item) => item.type === 1);
    this.found = [];
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
}
