import { Component, Input, OnInit } from '@angular/core';
import { AnyARecord } from 'dns';
import { Level, Item } from './treetable-functions';

@Component({
  selector: 'app-treetable',
  templateUrl: './treetable.component.html',
  styleUrls: ['./treetable.component.scss'],
})
export class TreetableComponent implements OnInit {
  /**every element in dataSource contains a list "child" */
  @Input() dataSource;
  @Input() displayedColumns;
  flatList: Item[];
  maxType = 2;

  displayList: Item[];

  constructor() {}

  ngOnInit(): void {
    this.getFlatList();
    console.log(this.flatList);
    this.displayList = this.flatList.filter((elem) => elem.level.type === 0);
  }

  getFlatList(): void {
    this.flatList = [];
    let data = this.dataSource;

    this.dataSource.forEach((child, indexP) => {
      let type = 0;
      let level: Level = { type: type, id: [indexP + 1, 0, 0] };
      this.addItemToFlatList(child, level);

      if (Array.isArray(child.child)) {
        let children = child.child;

        children.forEach((child, indexC) => {
          let type = 1;
          let level: Level = { type: type, id: [indexP + 1, indexC + 1, 0] };
          this.addItemToFlatList(child, level);

          if (Array.isArray(child.child)) {
            let children = child.child;

            children.forEach((child, indexCC) => {
              let type = 2;
              let level: Level = {
                type: type,
                id: [indexP + 1, indexC + 1, indexCC + 1],
              };
              this.addItemToFlatList(child, level);
            });
          }
        });
      }
    });
  }

  addItemToFlatList(data, level) {
    let item: Item = {
      content: data,
      level: level,
    };
    this.flatList.push(item);
  }

  isOpen(item: Item): boolean {
    if (!this.hasChild(item)) {
      return false;
    } else {
      //if item has child
      let indexDisplay = this.displayList.findIndex((e) => e === item);
      if (indexDisplay === this.displayList.length - 1) {
        return false;
      } else {
        if (
          this.displayList[indexDisplay + 1].level.type ===
          item.level.type + 1
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  }

  hasChild(item: Item): boolean {
    //if an item has a not empty child list
    if (item.level.type === this.maxType) {
      return false;
    } else {
      let indexFlat = this.flatList.findIndex((e) => e === item);
      if (indexFlat === this.flatList.length - 1) {
        return false;
      } else {
        return this.flatList[indexFlat + 1].level.type === item.level.type + 1;
      }
    }
  }

  handleClickItem(item: Item): void {
    //TODO!!!
    let type = item.level.type;
    console.log(this.hasChild(item));
    if (!this.isOpen(item)) {
      //open
      this.displayList = this.flatList.filter(
        (e) =>
          this.displayList.includes(e) ||
          (e.level.id[type] === item.level.id[type] &&
            //yg bener : dr 0 smpe type, dan type+2 jadi sama semua.
            e.level.id[type + 2] === item.level.id[type + 2])
      );
    } else {
      //close
      this.displayList = this.flatList.filter(
        (e) =>
          this.displayList.includes(e) &&
          (e.level.id[type] !== item.level.id[type] ||
            e.level.id[type + 1] === 0)
      );
    }
  }
}
