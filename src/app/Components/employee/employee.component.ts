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
    if (this.employee_service.list_employees_whole_data.size == 0)
      this.employee_service.list_employees.map(x => {
        this.employee_service.list_employees_whole_data.set(x.id, new EmployeeWithWholeData(x))
      })
    let employee = this.employee_service.list_employees_whole_data.get(this.currentEmployee.id)
    this.currentEmployeeWhole = employee
    if (employee != undefined) {
      if (employee.role == undefined)
        this.getRoleNameById()
      if (employee.list_departments == undefined)
        this.getDepartments()
      this.employee_service.list_employees_whole_data.get(this.currentEmployee.id).list_departments = this.currentEmployeeWhole.list_departments
      this.employee_service.list_employees_whole_data.get(this.currentEmployee.id).role = this.currentEmployeeWhole.role
    }
  }
  getRoleNameById() {
    this.employee_role_service.GetOneById(this.currentEmployee.role_id).subscribe(data => {
      if (data) {
        this.currentEmployeeWhole.role = data
      }
    })
  }
  //פונקציה לשליפת המחלקות בהן העובד עובד
  getDepartments() {
    this.employee_service.getDepartments(this.currentEmployee.id).subscribe(data => {
      this.list_departments = data
      this.currentEmployeeWhole.list_departments = data
    })
  }
  
  edit() {
    this.employee_service.employee = this.currentEmployee
    this.router.navigate(['/add-edit-employee', true])
  }
  //פונקציה למחיקת עובד
  delete() {
    this.employee_service.Delete(this.currentEmployee.id).subscribe(data => this.employee_service.list_employees = data)
  }
}
