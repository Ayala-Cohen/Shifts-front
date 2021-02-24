import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private employee_service:EmployeesService,private business_service:BusinessService) { }

  ngOnInit() {
  }
  getOut()
  {
    this.employee_service.employee = new Employee()
  }

}
