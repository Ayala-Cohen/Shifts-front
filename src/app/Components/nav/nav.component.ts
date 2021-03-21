import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/Classes/Business';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeesRole } from 'src/app/Classes/EmployeesRole';
import { Shift } from 'src/app/Classes/Shift';
import { Ward } from 'src/app/Classes/Ward';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router:Router, private employee_service:EmployeesService,private business_service:BusinessService, private shift_service:ShiftsService, private ward_service:WardService, private employee_role_service:EmployeesRoleService) { }

  ngOnInit() {
  }
  getOut()
  {
    this.employee_service.employee = new Employee()
    this.business_service.business = new Business()
    this.business_service.director_email = undefined
    this.business_service.director_name = undefined
    this.shift_service.list_shifts = new Array<Shift>()
    this.ward_service.list_wards = new Array<Ward>()
    this.employee_role_service.list_roles = new Array<EmployeesRole>()
    this.router.navigate(['log-in'])
  }

}
