import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  is_succes: boolean = false
  previous_password: string
  constructor(private employee_service: EmployeesService, private router: Router, private business_service:BusinessService) { }

  ngOnInit() {
    this.previous_password = this.employee_service.employee.password
    this.employee_service.default_password = `Ab${this.employee_service.employee.id}`

    this.employee_service.employee.password = ""
  }
  updatePassword() {
    this.employee_service.Update().subscribe(async data => {
      if (data) {
        this.employee_service.employee = data.filter(x => x.id == this.employee_service.employee.id)[0]
        this.is_succes = true
        await new Promise(resolve => setTimeout(resolve, 500));
        this.router.navigate(['integration'])
      }
    })
  }
}
