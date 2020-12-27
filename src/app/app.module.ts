import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { TreetableModule } from './treetable/treetable.module';

import { DialogLoginComponent } from './dialog-login/dialog-login.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Tabelle1Component } from './tabelle1/tabelle1.component';
import { DialogErrorComponent } from './dialog-error/dialog-error.component';
import { Tabelle2Component } from './tabelle2/tabelle2.component';
import { Tabelle3Component } from './tabelle3/tabelle3.component';
import { TreeTableComponent } from './tree-table/tree-table.component';
import { DialogEditComponent } from './dialog-edit/dialog-edit.component';
import { NaviComponent } from './navi/navi.component';
import { FooterComponent } from './footer/footer.component';
registerLocaleData(localeDe);

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DialogLoginComponent,
    Tabelle1Component,
    DialogErrorComponent,
    Tabelle2Component,
    Tabelle3Component,
    TreeTableComponent,
    DialogEditComponent,
    NaviComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatCardModule,
    TreetableModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'de' }, MatDatepickerModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
