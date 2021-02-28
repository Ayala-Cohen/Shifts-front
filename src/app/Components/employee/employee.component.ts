import { Component, Input, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() currentEmployee:Employee
  role:string 
  constructor(private employee_role_service:EmployeesRoleService, private employee_service:EmployeesService) {
    employee_role_service.GetOneById(this.currentEmployee.role_id).subscribe(data=>this.role = data.role)
   }

  ngOnInit() {
  }
  edit()
  {
    this.employee_service.employee = this.currentEmployee
  }
  delete()
  {
    this.employee_service.Delete(this.currentEmployee.id).subscribe(data=>this.employee_service.list_employees = data)
  }
}
