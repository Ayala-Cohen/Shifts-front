import { Component, OnInit } from '@angular/core';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogINComponent implements OnInit {

  constructor(private employee_service: EmployeesService, private business_service:BusinessService) { }

  ngOnInit() {
  }
  logIn() {
    this.employee_service.CheckEmployee().subscribe(data => {
      if (data) {
        this.employee_service.employee = data
        this.business_service.GetOneById(data.business_id).subscribe(data=>this.business_service.business = data)
      }
      else
        alert("לא מוכר במערכת")
    }),
    err=>alert("כשל בגישה לשרת")
  }

}
