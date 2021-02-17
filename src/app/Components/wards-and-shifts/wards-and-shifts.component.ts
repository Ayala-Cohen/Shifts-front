import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WardService } from 'src/app/Services/ward.service';
import { BusinessService } from 'src/app/Services/business.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { Shift } from 'src/app/Classes/Shift';
import { Ward } from 'src/app/Classes/Ward';

@Component({
  selector: 'app-wards-and-shifts',
  templateUrl: './wards-and-shifts.component.html',
  styleUrls: ['./wards-and-shifts.component.css']
})
export class WardsAndShiftsComponent implements OnInit {
  constructor(private router: Router, private ward_service: WardService, private shift_service: ShiftsService, private business_service: BusinessService, private employees_roles_service: EmployeesRoleService) {
    this.employees_roles_service.GetAll().subscribe(data => this.employees_roles_service.list_roles = data)

  }

  ngOnInit() {
  }
  AddOrUpdate(str: string) {
    if (str == "shift") {
      if (this.shift_service.shift.id == undefined) {
        this.shift_service.Add().subscribe(data => this.shift_service.list_shifts = data)
        this.shift_service.shift = new Shift()
      }
    }
    else {
      if (this.ward_service.ward.id == undefined) {
        this.ward_service.Add().subscribe(data => this.ward_service.list_wards = data)
        this.ward_service.ward = new Ward()
      }
    }
  }
  next() {
    //הוספת המחלקה האחרונה אם לא לחצו על כפתור ההוספה
    if (this.ward_service.ward.name != undefined)
      this.AddOrUpdate("ward")
    //הוספת המשמרת האחרונה אם לא לחצו על כפתור ההוספה
    if (this.shift_service.shift.name != undefined)
      this.AddOrUpdate("shift")

    this.router.navigate(['ward'])
  }

}
