import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/Classes/Business';
import { Employee } from 'src/app/Classes/Employee';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router, private employee_service:EmployeesService,private business_service:BusinessService) { }

  ngOnInit() {
  }
  getOut()
  {
    this.employee_service.employee = new Employee()
    this.business_service.business = new Business()
    this.router.navigate(['log-in'])
  }

}
