import { Component, OnInit } from '@angular/core';
import { AuthService } from '../service/auth.service';
import { EmployeeService } from '../service/employee.service';

@Component({
  selector: 'app-dialog-login',
  templateUrl: './dialog-login.component.html',
  styleUrls: ['./dialog-login.component.scss'],
})
export class DialogLoginComponent implements OnInit {
  employees: any[];
  hide = true;
  currentEmployee: any;
  inputPassword: string;
  inputEmployeeId: string;
  errorPassword: boolean = false;
  message: string = 'Das eingegebene Kennwort ist nicht korrekt';
  constructor(
    private employeeService: EmployeeService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        console.log('getting employee succeed');
        this.employees = data;
      },
      (error) => {
        console.log('error getting employee', error.status);
      }
    );
  }

  handleClickLogin() {
    this.loginEmployee(this.inputEmployeeId, this.inputPassword);
  }

  loginEmployee(employeeId: string, password: string) {
    this.authService.logOutTerminal().subscribe(
      (data) => {
        console.log('logout terminal before login employee succeed');
        this.authService.logInEmployee(employeeId, password).subscribe(
          (data) => {
            this.currentEmployee = data;
            this.errorPassword = false;
            console.log('login employee succeed');
          },
          (error) => {
            this.errorPassword = true;
            console.log('error login employee', error.status);
          }
        );
      },
      (error) => {
        console.log(
          'error logout terminal before login employee',
          error.status
        );
      }
    );
  }
}
