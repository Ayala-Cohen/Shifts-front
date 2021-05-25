import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Assigning } from 'src/app/Classes/Assigning';
import { Business } from 'src/app/Classes/Business';
import { Constraint } from 'src/app/Classes/Constraint';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeesRole } from 'src/app/Classes/EmployeesRole';
import { Rating } from 'src/app/Classes/Rating';
import { Shift } from 'src/app/Classes/Shift';
import { ShiftEmployees } from 'src/app/Classes/ShiftEmployee';
import { ShiftInDay } from 'src/app/Classes/ShiftInDay';
import { Ward } from 'src/app/Classes/Ward';
import { AssigningService } from 'src/app/Services/assigning.service';
import { BusinessService } from 'src/app/Services/business.service';
import { ConstraintsService } from 'src/app/Services/constraints.service';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsEmployeesService } from 'src/app/Services/shifts-employees.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  constructor(private router: Router,private shift_employees_service:ShiftsEmployeesService, private constraints_service: ConstraintsService, private integration_service: IntegrationService, private assigning_service: AssigningService, private employee_service: EmployeesService, private business_service: BusinessService, private shift_service: ShiftsService, private ward_service: WardService, private employee_role_service: EmployeesRoleService) { }

  ngOnInit() {
    this.business_service.business = new Business()
    this.employee_service.employee = new Employee()
  }
  clearData() {
    this.assigning_service.list_assigning = new Array<Assigning>()
    this.business_service.business = new Business()
    this.constraints_service.list_constraints = new Array<Constraint>()
    this.constraints_service.constraints_in_shift = new Map<number, Map<number, number>>()
    this.employee_role_service.list_roles = new Array<EmployeesRole>()
    this.employee_role_service.role = new EmployeesRole()
    this.employee_service.employee = new Employee()
    this.employee_service.list_employees_whole_data = new Map<string, Array<Ward>>()
    this.employee_service.is_director = false
    this.employee_service.list_employees = new Array<Employee>()
    this.integration_service.list_rating = new Array<Rating>()
    this.integration_service.rating = new Rating()
    this.shift_employees_service.list_employees_in_shift = new Array<ShiftEmployees>()
    this.shift_employees_service.employee_in_shift = new ShiftEmployees()
    this.shift_service.list_shifts = new Array<Shift>()
    this.shift_service.list_shifts_in_day = new Array<ShiftInDay>()
    this.ward_service.list_wards = new Array<Ward>()
  }
  getOut() {
    this.clearData()
  }
}
