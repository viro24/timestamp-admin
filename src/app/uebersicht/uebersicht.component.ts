import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { TreeNode } from '../treetable/treetable-functions';

@Component({
  selector: 'app-uebersicht',
  templateUrl: './uebersicht.component.html',
  styleUrls: ['./uebersicht.component.scss'],
})
export class UebersichtComponent implements OnInit {
  currentEmployeeId: string = '10';
  dateStart;
  dateEnd;
  dateStartDisplay;
  dateEndDisplay;
  bookingData;
  listDisplay;
  listComplete;
  showRange;
  employees;
  tree: TreeNode[] = [];
  title = 'Übersichtstabelle';
  disCols = [
    'datum',
    'start',
    'end',
    'action',
    'istAZ',
    'sollAZ',
    'istPause',
    'sollPause',
    'ueberstunden',
  ];

  constructor(public employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getBookingData(): void {
    this.employeeService
      .getBookingbyId(this.currentEmployeeId, this.dateStart, this.dateEnd)
      .subscribe(
        (data) => {
          this.bookingData = data;
          //this.generateDatasource();
          this.generateTree();
          console.log('tree', this.tree);
          console.log('bookingData', this.bookingData);
        },
        (error) => {
          console.log('error getting booking data');
        }
      );
  }

  getNode(type: number, value: any): TreeNode {
    let node: TreeNode = {
      type: type,
      value: [value],
      child: [],
    };
    return node;
  }

  /**generate Tree method,
   * to use if you have a constant dataSource,
   * where the children are always packed in one particular list
   * with constant name
   * (in this case, the 'list')
   */
  // recursive(tree, node, type): void {
  //   if (node.length > 0) {
  //     node.forEach((n) => {
  //       let newNode = this.getNode(type, n);
  //       tree.child.push(newNode);
  //       this.recursive(newNode, n.list, type + 1);
  //     });
  //   }
  // }

  // generateTree1(): void {
  //   this.bookingData.forEach((d) => {
  //     let nodeD = this.getNode(1, d);
  //     tree.push(nodeD);
  //     this.recursive(nodeD, d.list, 2);
  //   });
  // }

  //TODO : generateTree manually
  generateTree(): void {
    this.tree = [];
    this.bookingData.forEach((d) => {
      let nodeD = this.getNode(1, d);
      this.tree.push(nodeD);
      if (d.bookingsList.length > 0) {
        let books = d.bookingsList;
        books.forEach((b) => {
          let nodeB = this.getNode(2, b);
          nodeD.child.push(nodeB);
          if (b.breakList.length > 0) {
            let breaks = b.breakList;
            breaks.forEach((p) => {
              let nodeP = this.getNode(3, p);
              nodeB.child.push(nodeP);
            });
          }
        });
      }
    });
  }

  recursiveGenerateTree(tree, list, type) {
    if (list.length > 0) {
      list.forEach((item) => {
        let node = this.getNode(type, item);
        tree.push(node);
      });
    }
  }

  handleClickFilter() {
    if (
      this.currentEmployeeId === undefined ||
      this.dateStart === undefined ||
      this.dateEnd === undefined
    ) {
      this.showRange = false;
      let msg = '';
      if (this.currentEmployeeId === undefined) {
        msg = 'Bitte wählen Sie einen Mitarbeiter aus.';
      } else {
        msg = 'Bitte wählen Sie das Start- und Enddatum.';
      }
    } else {
      this.dateStartDisplay = this.dateStart;
      this.dateEndDisplay = this.dateEnd;
      this.showRange = true;
      this.getBookingData();
    }
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.employees = data;
        console.log('succeed getting employees');
      },
      (error) => {
        console.log('error getting employees', error.status);
      }
    );
  }
}
