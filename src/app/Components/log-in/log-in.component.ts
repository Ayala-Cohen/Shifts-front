import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
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

  constructor(private employee_service: EmployeesService, private business_service:BusinessService, private ward_service:WardService,private shift_service:ShiftsService) { }

  ngOnInit() {
  }
  logIn() {
    this.employee_service.CheckEmployee().subscribe(data => {
      if (data) {
        this.employee_service.employee = data
        this.business_service.GetOneById(data.business_id).subscribe(x=>this.business_service.business = x)
      }
      else
        alert("לא מוכר במערכת")
    }),
    err=>alert("כשל בגישה לשרת")
  }
  getOut()
  {
    this.employee_service.employee = new Employee()
  }

}
