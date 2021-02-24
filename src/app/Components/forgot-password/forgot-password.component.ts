import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  isClicked: boolean = false
  constructor(private employee_service: EmployeesService) { }

  ngOnInit() {
  }
  forgotPassword() {
    this.isClicked = true
    this.employee_service.getEmployeeByEmail().subscribe(data => this.employee_service.employee = data)
  }

}
