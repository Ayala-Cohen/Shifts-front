import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogINComponent implements OnInit {

  constructor(private employee_service: EmployeesService, private business_service: BusinessService, private ward_service: WardService, private shift_service: ShiftsService, private router: Router) { }

  ngOnInit() {
  }
  logIn() {
    this.employee_service.CheckEmployee().subscribe(data => {
      if (data) {
        this.employee_service.employee = data
        this.employee_service.getBusinessByEmployee(data.business_id)
        this.router.navigate(['integration'])
      }
      else {
        this.business_service.getBusinessBydirectorDetails(this.employee_service.employee.email, this.employee_service.employee.password).subscribe(x => {
          if (x) {
            this.business_service.business = x
            this.router.navigate(['wards-shifts'])
          }
          else
            alert("לא מוכר במערכת")
        })
      }
    }),
      err => alert("כשל בגישה לשרת")
  }
}
