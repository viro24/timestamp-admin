import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
})
export class TreetableComponent implements OnInit {
  @Input() dataSource;
  @Input() displayedColumns;
  flatList = [];
  displayList = [];
  maxType = 0;

  constructor() {}

  ngOnInit(): void {
    this.getFlatList();
    this.displayList = this.flatList.filter((e) => e.type === 1);
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
