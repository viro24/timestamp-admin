import { Component, OnInit, Input } from '@angular/core';
import bookingMock from '../tabelle1/bookingMock';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.scss'],
})
export class TreeTableComponent implements OnInit {
  datasource = bookingMock;
  tree = {};

  constructor() {}

  ngOnInit(): void {
    this.generateTree();
    //console.log(this.tree);
  }

  addNodes(node: any): void {
    let parent = {};
    //let value = 'value';
    Object.entries(node).forEach((entry) => {
      const [key, val] = entry;
      if (!Array.isArray(val)) {
        parent[key] = val;
      } else {
        parent['children'] = [];
        let parent1 = {};
        entry.forEach((e) => {});
      }
    });
    this.tree['value'] = parent;
  }

  generateTree(): void {
    this.datasource.forEach((e) => {
      this.addNodes(e);
    });
  }
}

// [ value]
