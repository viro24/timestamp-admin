import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { EmployeeService } from '../service/employee.service';
import { DialogErrorComponent } from '../dialog-error/dialog-error.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  clock;
  date;
  employees: any[];
  currentEmployee: any;
  inputPassword: string;
  inputEmployeeId: string;
  errorPassword = false;
  buttonDisabled = false;
  message = 'Das eingegebene Kennwort ist nicht korrekt';
  constructor(
    private authService: AuthService,
    private employeeService: EmployeeService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loginTerminal();
    setInterval(() => {
      this.clock = new Date();
    }, 1000);
    this.date = new Date();
  }

  handleClickLogin(): void {
    this.loginEmployee(this.inputEmployeeId, this.inputPassword);
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        console.log('getting employees succeed');
        this.employees = data;
      },
      (error) => {
        console.log('error getting employees', error.status);
        this.dialog.open(DialogErrorComponent, {
          height: '300px',
          width: '400px',
          data: {
            errorStatus: error.status,
            action: 'Get Employees fehlgeschlagen.',
          },
        });
      }
    );
  }

  loginTerminal(): void {
    this.authService.logOutTerminal().subscribe(
      (data) => {
        console.log('Terminal logout succeed');
        this.authService.logInTerminal().subscribe(
          (dataLogin) => {
            console.log('Terminal login succeed');
            this.getEmployees();
          },
          (error) => {
            console.log('Terminal login error');
            this.dialog.open(DialogErrorComponent, {
              height: '300px',
              width: '400px',
              data: {
                errorStatus: error.status,
                action: 'Terminal Login fehlgeschlagen.',
              },
            });
          }
        );
      },
      (error) => {
        console.log('Terminal logout error');
        this.dialog.open(DialogErrorComponent, {
          height: '300px',
          width: '400px',
          data: {
            errorStatus: error.status,
            action: 'Terminal Logout fehlgeschlagen.',
          },
        });
      }
    );
  }

  loginEmployee(employeeId: string, password: string): void {
    this.buttonDisabled = true;
    this.authService.logOutTerminal().subscribe(
      (data) => {
        console.log('logout terminal before login employee succeed');
        this.authService.logInEmployee(employeeId, password).subscribe(
          (dataEmployee) => {
            this.currentEmployee = dataEmployee;
            this.errorPassword = false;
            //this.router.navigateByUrl('/tabelle-1');
            this.router.navigateByUrl('/hallo');
            console.log('login employee succeed');
          },
          (error) => {
            this.errorPassword = true;
            console.log('error login employee', error.status);
            this.buttonDisabled = false;
            this.dialog.open(DialogErrorComponent, {
              height: '300px',
              width: '400px',
              data: {
                errorStatus: error.status,
                action: 'Employee Login fehlgeschlagen.',
              },
            });
          }
        );
      },
      (error) => {
        console.log(
          'error logout terminal before login employee',
          error.status
        );
        this.buttonDisabled = false;
        this.dialog.open(DialogErrorComponent, {
          height: '300px',
          width: '400px',
          data: {
            errorStatus: error.status,
            action:
              'Terminal logout vorm Einloggen des Mitarbeiters fehlgeschlagen.',
          },
        });
      }
    );
  }
}
