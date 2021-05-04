import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeWithWholeData } from 'src/app/Classes/EmployeeWithWholeData';
import { Ward } from 'src/app/Classes/Ward';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() currentEmployee: Employee
  currentEmployeeWhole: EmployeeWithWholeData = new EmployeeWithWholeData()
  list_departments: Array<Ward> = new Array<Ward>()
  constructor(private router: Router, private employee_role_service: EmployeesRoleService, private employee_service: EmployeesService) {
  }

  ngOnInit() {
    let deps = this.employee_service.list_employees_whole_data[this.currentEmployee.id]
    this.currentEmployeeWhole = new EmployeeWithWholeData(this.currentEmployee)
    if (deps)
      this.currentEmployeeWhole.list_departments= deps
  }
  getRoleNameById() {
    let role = this.employee_role_service.list_roles.find(x => x.id == this.currentEmployee.role_id)
    if (role)
      return role.role
  }
  edit() {
    this.employee_service.employee = this.currentEmployee
    this.router.navigate(['/add-edit-employee', true])
  }
  //פונקציה למחיקת עובד
  delete() {
    this.employee_service.list_employees_whole_data.delete(this.currentEmployee.id)
    this.employee_service.Delete(this.currentEmployee.id).subscribe(data => {
      if (data)
        this.employee_service.list_employees = data
    })
  }
}
