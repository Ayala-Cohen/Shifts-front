import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShiftEmployees } from 'src/app/Classes/ShiftEmployee';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { ShiftsEmployeesService } from 'src/app/Services/shifts-employees.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]
  constructor(private router: Router, private ward_service: WardService, private shift_service: ShiftsService, private employees_roles_service: EmployeesRoleService, private shift_employees_service: ShiftsEmployeesService) { }

  ngOnInit(): void {
  }
  AddOrUpdate(ward_id: number, shift_id: number, role_id: number) {
    //check what is the condition for update 
    let num_shift = this.shift_employees_service.employee_in_shift.number_of_shift_employees
    if (num_shift != undefined && num_shift!=0) {//כאשר מדובר בתפקיד שיש לו שימוש במחלקה זו
      this.shift_employees_service.employee_in_shift.department_id = ward_id
      this.shift_employees_service.employee_in_shift.shift_id = shift_id
      this.shift_employees_service.employee_in_shift.role_id = role_id
      this.shift_employees_service.Add().subscribe(data => this.shift_employees_service.list_employees_in_shift = data)
      this.shift_employees_service.employee_in_shift = new ShiftEmployees()
    }
  }

  next() {
    this.router.navigate(['employees-details'])
  }
}
