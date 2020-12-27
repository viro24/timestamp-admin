import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.scss'],
})
export class NaviComponent implements OnInit {
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  tableNumber: string;
  ngOnInit(): void {
    //this.tableNumber = 1;

    this.tableNumber = this.activatedRoute.snapshot.url[0].path;
    console.log(this.tableNumber);
  }

  handleClickNavi(tabelleNummer: number): void {
    this.router.navigateByUrl('/tabelle-' + tabelleNummer);
  }
}
