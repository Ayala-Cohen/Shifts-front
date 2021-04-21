import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeesRole } from 'src/app/Classes/EmployeesRole';
import { Shift } from 'src/app/Classes/Shift';
import { ShiftEmployees } from 'src/app/Classes/ShiftEmployee';
import { Ward } from 'src/app/Classes/Ward';
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
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

  constructor(private router: Router, private ward_service: WardService, private shift_service: ShiftsService, private employees_roles_service: EmployeesRoleService, private shift_employees_service: ShiftsEmployeesService) {
  }

  ngOnInit(): void {
  }

  edit(shift_id: number, day: string, role_id: number, dep_id: number) {
    let current = this.isExsit(shift_id, day, role_id, dep_id)
    if (current)
      this.shift_employees_service.employee_in_shift = current
  }
  isExsit(shift_id: number, day: string, role_id: number, dep_id: number) {
    let current = this.shift_employees_service.list_employees_in_shift.find(x => x.shift_id == shift_id && x.day == day && x.role_id == role_id && x.department_id == dep_id)
    return current
  }
  AddOrUpdate(ward_id: number, shift_id: number, role_id: number, num_shifts: number, day: string) {
    num_shifts = num_shifts as number
    this.shift_employees_service.employee_in_shift.number_of_shift_employees = num_shifts
    if (this.isExsit(shift_id, day, role_id, ward_id))//כאשר מדובר בעריכה
    {
      this.shift_employees_service.Update().subscribe(data => {
        if (data)
          this.shift_employees_service.list_employees_in_shift = data
        else
          console.log("the server returned null")
      })
    }
    else {
      this.shift_employees_service.employee_in_shift.department_id = ward_id
      this.shift_employees_service.employee_in_shift.shift_id = shift_id
      this.shift_employees_service.employee_in_shift.role_id = role_id
      this.shift_employees_service.employee_in_shift.day = day
      this.shift_employees_service.Add().subscribe(x => {
        if (x)
          this.shift_employees_service.list_employees_in_shift = x
        else
          console.log("the server returned null")
      })
    }
    this.shift_employees_service.employee_in_shift = new ShiftEmployees()
  }


  next() {
    this.router.navigate(['add-edit-employee', false])
  }
  getNumOfRole(ward_id: number, shift_id: number, role_id: number, day: string) {
    let shift_employee = this.isExsit(shift_id, day, role_id, ward_id)
    if (shift_employee)
      return shift_employee.number_of_shift_employees
    return 0
  }
  getColor(shift_id: number, day: string, ward_id: number) {
    if (this.shift_employees_service.list_employees_in_shift.filter(x => x.shift_id == shift_id && x.day == day && x.department_id == ward_id).length != 0)
      return "rgb(152, 200, 210)"
    return "rgb(255, 255, 255)"
  }
}
