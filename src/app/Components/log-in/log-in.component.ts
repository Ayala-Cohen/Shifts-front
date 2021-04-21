import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeeWithWholeData } from 'src/app/Classes/EmployeeWithWholeData';
import { AssigningService } from 'src/app/Services/assigning.service';
import { BusinessService } from 'src/app/Services/business.service';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsEmployeesService } from 'src/app/Services/shifts-employees.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogINComponent implements OnInit {

  constructor(private shift_employee_service: ShiftsEmployeesService, private employees_roles_service: EmployeesRoleService, private employee_service: EmployeesService, private integration_service: IntegrationService, private business_service: BusinessService, private ward_service: WardService, private shift_service: ShiftsService, private assigning_service: AssigningService, private router: Router) { }

  ngOnInit() {
  }
  getAllData() {
    if (this.employee_service.employee.id != undefined) {//ההתחברות התבצעה על ידי עובד ולא על ידי מנהל
      this.integration_service.GetAll().subscribe(data => this.integration_service.list_rating = data)//שליפת רשימת הדירוגים של העובד
    }
    this.employee_service.GetAll().subscribe(x => {
      this.employee_service.list_employees = x
      // if (this.employee_service.list_employees_whole_data.size == 0)
      //   x.map(x => {
      //     let list_departments
      //     this.employee_service.getDepartments(x.id).subscribe(data => {
      //       if (data)
      //         list_departments = data
      //       this.employee_service.list_employees_whole_data.set(x.id, new EmployeeWithWholeData(x,list_departments))
      //     })
      //   })
    })
    this.employee_service.GetAllEmployeesDepartments().subscribe(data => {
      if (data)
        this.employee_service.list_employees_whole_data = data
    })
    this.shift_service.GetAll().subscribe(data => { if (data) this.shift_service.list_shifts = data })
    this.employees_roles_service.GetAll().subscribe(data => { if (data) this.employees_roles_service.list_roles = data })
    this.ward_service.GetAll().subscribe(data => { if (data) this.ward_service.list_wards = data })
    this.shift_service.getAllShiftsInDay().subscribe(data => { if (data) this.shift_service.list_shifts_in_day = data })
    this.assigning_service.getAssigning().subscribe(data => { if (data) this.assigning_service.list_assigning = data })
    this.shift_employee_service.GetAll().subscribe(data => { if (data) this.shift_employee_service.list_employees_in_shift = data })

  }
  logIn() {
    this.employee_service.CheckEmployee().subscribe(data => {
      if (data) {
        this.employee_service.employee = data
        let b = this.business_service.list_business.find(x => x.id == data.business_id)
        this.business_service.business = b
        this.getAllData()
        if (this.employee_service.employee.password == this.employee_service.default_password)
          this.router.navigate(['forgot-password'])
        else
          this.router.navigate(['integration'])

      }
      else {
        this.business_service.getBusinessBydirectorDetails(this.employee_service.employee.email, this.employee_service.employee.password).subscribe(x => {
          if (x) {
            this.business_service.business = x
            this.employee_service.is_director = true
            this.getAllData()
            this.employee_service.employee = new Employee()
            this.router.navigate(['wards-shifts'])

          }
          else
            alert("לא מוכר במערכת")
        })
      }
    }),
      err => alert("כשל בגישה לשרת")
  }
}
