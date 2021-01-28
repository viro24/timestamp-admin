import {Component, Input, OnInit} from '@angular/core';
import {TreeNode} from './treetable-functions';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
})
export class TreetableComponent implements OnInit {
  @Input() dataSource: TreeNode[];
  @Input() displayedColumns: string[];
  @Input() titleT;

  flatList = [];
  displayList = [];
  filterList = [];
  maxType = 0;
  spalten = [];
  data;
  open = [];
  found = [];
  editable: boolean[] = [];

  constructor() {
  }

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
    this.getMaxType();
  }

  getMaxType(): void {
    let max = 0;
    this.flatList.forEach((i) => {
      if (i.type > max) {
        max = i.type;
      }
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
    if (item.type < 0) {
      return null;
    }
    return this.getChild(item).length > 0;
  }

  /**gibt die dazugehörigen Kinder des eingegebenen Items */
  getChild(item): TreeNode[] {
    if (item.type < 0) {
      return null;
    }
    const index = this.flatList.findIndex((e) => e === item);
    return this.flatList[index].child;
  }

  /**die Funktion, die aufgerufen wird,
   * wenn man an einem Item in der Tabelle klickt.
   * Das Item wird je nach Zustand
   * auf- oder zugeklappt.
   */
  handleClick(item): void {
    // if (item.type !== this.maxType) {
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
    // }
  }

  /**Aufklappen eines Items in der Tabelle */
  openTag(item): void {
    const children = this.getChild(item);
    if (children.length > 0) {
      this.displayList = this.flatList.filter(
        (e) => this.displayList.includes(e) || children.includes(e)
      );
    }
    console.log(this.getIndexForAdd(item));
    this.addForNewItem(item);
    this.setEditable(item);
  }

  getIndexForAdd(item): number {
    let index;
    const type = item.type;
    for (
      let i = this.displayList.indexOf(item) + 1;
      i < this.displayList.length;
      i++
    ) {
      if (this.displayList[i].type !== type + 1) {
        index = i;
        break;
      }
    }
    return index;
  }

  addForNewItem(item): void {
    const index = item.type + 1;
    console.log(-index);
    const node: TreeNode = {
      type: -index,
      value: [],
      child: [],
    };

    this.displayList.splice(this.getIndexForAdd(item), 0, node);
    console.log(this.displayList);
  }

  setEditable(item): void {
    this.editable = [];
    this.displayList.forEach((i) => this.editable.push(false));
    const index = this.displayList.indexOf(item);
    const type = item.type;
    for (let i = index + 1; i < this.displayList.length; i++) {
      if (this.displayList[i].type === type + 1) {
        this.editable[i] = true;
      } else {
        break;
      }
    }
    if (type === 2) {
      this.editable[index] = true;
    }
  }

  /**Zuklappen eines Items in der Tabelle */
  closeTag(item): void {
    const children = [];
    const index = this.flatList.findIndex((e) => e === item);
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
    this.editable = [];
    this.displayList.forEach((i) => this.editable.push(false));
  }

  /**gibt zurück, ob ein Item gerade aufgeklappt ist. */
  isOpen(item): boolean {
    if (!this.hasChild(item)) {
      return this.open[this.flatList.indexOf(item)];
    } else {
      const indexDisplay = this.displayList.findIndex((e) => e === item);
      const indexFlat = this.flatList.findIndex((e) => e === item);
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
    this.editable = [];
    this.displayList.forEach((e) => this.editable.push(false));
    const pattern = $event.trim().toLocaleLowerCase();
    console.log('pattern', pattern);
    const index = [];
    const filtered = this.filterList.filter((item) => item.includes(pattern));
    filtered.forEach((item) => index.push(this.filterList.indexOf(item)));
    console.log('index :', index);
    console.log('filtered :', filtered);
    this.displayList = [];
    index.forEach((i) => {
      const temp = this.getAll(this.flatList[i]);
      temp.forEach((t) => {
        if (!this.displayList.includes(t)) {
          this.displayList.push(t);
        }
      });
    });
    const highlighted = [];
    index.forEach((i) => {
      const h = this.displayList.indexOf(this.flatList[i]);
      highlighted.push(h);
    });
    this.found = highlighted;
    console.log('found!', this.found);
    console.log('display', this.displayList);
  }

  /**alle Items, die sich in obere(n), und auch gleicher Ebene von item aufklappen*/
  getAll(item): TreeNode[] {
    let result: TreeNode[] = [];
    const index = this.flatList.indexOf(item);
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
    result.sort(function(a, b) {
      if (a.type < b.type) {
        return -1;
      }
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
        // substring(11,16)
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
  }

  /**Spalte löschen */
  minColumn($event): void {
    const index = this.spalten.indexOf($event);
    if (index !== -1) {
      this.spalten.splice(index, 1);
    }
  }

  /**Spalten wie im Anfangszustand zurücksetzen */
  resetColumn(): void {
    this.spalten = [];
    this.displayedColumns.forEach((col) => this.spalten.push(col));
  }

  /**-------------------------------------------------------------- */
}
