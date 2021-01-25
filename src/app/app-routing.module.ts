import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { Tabelle1Component } from './tabelle1/tabelle1.component';
import { Tabelle2Component } from './tabelle2/tabelle2.component';
import { Tabelle3Component } from './tabelle3/tabelle3.component';
import { OverviewComponent } from './overview/overview.component';
import { Overview1Component } from './overview1/overview1.component';
import { UebersichtComponent } from './uebersicht/uebersicht.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  //{ path: '', component: UebersichtComponent },
  { path: 'tabelle-1', component: Tabelle1Component },
  { path: 'tabelle-2', component: Tabelle2Component },
  { path: 'tabelle-3', component: Tabelle3Component },
  { path: 'overview', component: OverviewComponent },
  { path: 'overview-1', component: Overview1Component },
  { path: 'hallo', component: UebersichtComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
