import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WardService } from 'src/app/Services/ward.service';
import { BusinessService } from 'src/app/Services/business.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { Shift } from 'src/app/Classes/Shift';
import { Ward } from 'src/app/Classes/Ward';
import { DatePipe } from '@angular/common'

@Component({
  selector: 'app-wards-and-shifts',
  templateUrl: './wards-and-shifts.component.html',
  styleUrls: ['./wards-and-shifts.component.css']
})
export class WardsAndShiftsComponent implements OnInit {
  constructor(private router: Router, private ward_service: WardService, private shift_service: ShiftsService, private business_service: BusinessService, private employees_roles_service: EmployeesRoleService) {
  }

  ngOnInit() {
  }
  edit(str: string, id) {
    if (str == "shift") {
      this.shift_service.GetOneById(id).subscribe(data => { if (data) this.shift_service.shift = data })
    }
    if (str == "ward") {
      this.ward_service.GetOneById(id).subscribe(data => {
        if (data)
          this.ward_service.ward = data
      })
    }
  }
  AddOrUpdate(str: string) {
    if (str == "shift") {
      if (this.shift_service.shift.id == undefined) {
        this.shift_service.Add().subscribe(data => { if (data) this.shift_service.list_shifts = data })
        this.shift_service.shift = new Shift()
      }
      else {
        this.shift_service.Update().subscribe(data => { if (data) this.shift_service.list_shifts = data })
      }
    }
    else {
      if (this.ward_service.ward.id == undefined) {
        this.ward_service.Add().subscribe(data => { if (data) this.ward_service.list_wards = data })
        this.ward_service.ward = new Ward()
      }
      else {
        this.ward_service.Update().subscribe(data => { if (data) this.ward_service.list_wards = data })
      }
    }
  }
  delete(str: string, id) {
    if (str == 'shift')
      this.shift_service.Delete(id).subscribe(data => { if (data) this.shift_service.list_shifts = data })
    else
      this.ward_service.Delete(id).subscribe(data => { if (data) this.ward_service.list_wards = data })
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
