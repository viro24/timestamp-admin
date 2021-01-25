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
  maxType = 0;
  tree: TreeNode[] = [];
  spalten = [];
  data;

  constructor() {}

  ngOnInit(): void {
    this.displayedColumns.forEach((col) => this.spalten.push(col));
    this.getFlatList();
    this.displayList = this.flatList.filter((e) => e.type === 1);
    console.log('flatList', this.flatList);
    this.data = new MatTableDataSource(this.flatList);
    console.log('mattabledatasource', this.data);
  }

  filter($event) {
    console.log('tralala', $event.trim().toLocaleLowerCase());
  }

  addColumn($event): void {
    this.spalten.push($event);
    console.log('$event');
  }

  minColumn($event): void {
    console.log('min', $event);
    let index = this.spalten.indexOf($event);
    console.log(index);
    if (index !== -1) {
      this.spalten.splice(index, 1);
    }
    console.log(this.spalten);
  }

  resetColumn(): void {
    this.spalten = [];
    this.displayedColumns.forEach((col) => this.spalten.push(col));
  }

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
