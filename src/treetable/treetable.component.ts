import { Component, Input, OnInit } from '@angular/core';
import { TreeNode } from './treetable-functions';
@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
})
export class TreetableComponent implements OnInit {
  @Input() dataSource: TreeNode[]; //dataSource in Form einer TreeNode (nicht flacher) Liste. Davor muss der Baum generiert werden.
  @Input() displayedColumns: string[]; //die komplette, angegebene Spalten
  @Input() titleT; //Title der Tabelle

  flatList: TreeNode[] = []; // die komplette, flache Liste, von der die Items für DisplayList bzw. für die Filterfunktion genommen werden.
  displayList: TreeNode[] = []; // die angezeigte Liste
  filterList: string[] = []; // Liste aus string Elemente, aus allen Daten, die in der Tabelle anzuzeigen sind.
  maxType = 0;
  spalten: string[] = []; //angezeigte, auswählbare Spalten
  data;
  open = true;

  ngOnInit(): void {
    this.displayedColumns.forEach((col) => this.spalten.push(col));
    this.getFlatList();
    this.displayList = this.flatList.filter((e) => e.type === 1);
    this.getFilterList();
  }

  /**Generieren aller Variablen, die fürs Treetable notwendig sind */
  /**die flache Liste generieren */
  getFlatList() {
    this.dataSource.forEach((d) => {
      this.flatList.push(d);
      this.recursive(d);
    });
    this.getMaxType();
  }

  /**rekursive Funktion fürs Generieren der flachen Liste */
  recursive(item): void {
    if (Array.isArray(item.child)) {
      item.child.forEach((b) => {
        this.flatList.push(b);
        this.recursive(b);
      });
    }
  }

  /**die höchste Zahl der Type zurückgeben
   * items mit type===maxtype bekommen andere Zeichen
   */
  getMaxType(): void {
    let max = 0;
    this.flatList.forEach((i) => {
      if (i.type > max) {
        max = i.type;
      }
    });
    this.maxType = max;
  }

  /**--------------------------------------------------------------------- */

  /**Treetable Funktionen,
   * die notwendig sind, damit das Auf- und Zuklappen der Treetable funktionieren.
   */

  /**überprüfen, ob ein Item Kinder hat */
  hasChild(item): boolean {
    return this.getChild(item).length > 0;
  }

  /**gibt alle direkte(!) Kinder eines Items zurück */
  getChild(item): TreeNode[] {
    const index = this.flatList.findIndex((e) => e === item);
    return this.flatList[index].child;
  }

  /**handling Click in jedem angezeigten Item
   * je nach dem, wie der Zustand des Items ist,
   * wird dessen Kinder auf- oder zugeklappt.
   */
  handleClick(item): void {
    if (this.isOpen(item)) {
      this.closeTag(item);
    } else {
      this.openTag(item);
    }
  }

  /**Aufklappen Funktion */
  openTag(item): void {
    const children = this.getChild(item);
    if (children.length > 0) {
      this.displayList = this.flatList.filter((e) => this.displayList.includes(e) || children.includes(e));
    }
  }

  /**Zuklappen Funktion */
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
      this.displayList = this.flatList.filter((e) => this.displayList.includes(e) && !children.includes(e));
    }
  }

  /**gibt zurück, ob ein Item gerade offen oder nicht ist. */
  isOpen(item): boolean {
    if (!this.hasChild(item)) {
      return false;
    } else {
      const indexDisplay = this.displayList.findIndex((e) => e === item);
      const indexFlat = this.flatList.findIndex((e) => e === item);
      if (indexDisplay === this.displayList.length - 1) {
        return false;
      } else {
        if (this.displayList[indexDisplay + 1] === this.flatList[indexFlat + 1]) {
          return true;
        } else {
          return false;
        }
      }
    }
  }
  /**-------------------------------------------------------------------------------------------------- */

  /**Funktionen für die Filterfunktion */

  /**Filterfunktion, die nach der gegebenen Muster filtert */
  filter($event) {
    const pattern = $event.trim().toLocaleLowerCase();
    console.log('pattern', pattern);
    const index = [];
    const filtered = this.filterList.filter((item) => item.includes(pattern));
    filtered.forEach((item) => index.push(this.filterList.indexOf(item)));
    this.displayList = [];
    index.forEach((i) => {
      const temp = this.getAll(this.flatList[i]);
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
    result.sort(function (a, b) {
      if (a.type < b.type) return -1;
    });
    return result;
  }

  /**eine Liste zurückgeben, die für die Filter Funktion verantwortlich ist
   * die Items in der Liste sind vergleichbar mit den in Flatlist,
   * beinhaltet string von jedem Item in Flatlist, die in Tabelle angezeigt wird
   * Leerzeichen weg und alle klein geschrieben
   */
  getFilterList(): void {
    // this.flatList.forEach((item) => {
    //   let s = '';
    //   if (item.type === 1) {
    //     s += item.value[0].dateOfDetails;
    //     s += item.value[0].completePeriod.start;
    //     s += item.value[0].completePeriod.end;
    //   } else {
    //     if (item.type === 2) {
    //       s += 'Buchung';
    //     } else {
    //       s += 'Pause';
    //     }
    //     s += item.value[0].period.start;
    //     s += item.value[0].period.end;
    //   }
    //   s = s.trim().toLocaleLowerCase();
    //   this.filterList.push(s);
    // });
  }

  /**zurück zum Anfangszustand ohne Suche
   * Inhalt der Funktion soll angepasst werden,
   * je nach dem wie der Anfangszustand aussieht.
   */
  clearSearch(): void {
    this.displayList = this.flatList.filter((item) => item.type === 1);
  }

  /**------------------------------------------------------------ */

  /**Spaltenauswahl Funktion */

  /** in displayedColumn verfügbare Spalte hinzufügen*/
  addColumn($event): void {
    this.spalten.push($event);
  }

  /**Spalte löschen */
  minColumn($event): void {
    console.log('min', $event);
    const index = this.spalten.indexOf($event);
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
}
