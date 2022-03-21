import { Component, OnInit } from '@angular/core';
import { Assigning } from 'src/app/Classes/Assigning';
import { Employee } from 'src/app/Classes/Employee';
import { AssigningService } from 'src/app/Services/assigning.service';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';


@Component({
  selector: 'app-final-integration',
  templateUrl: './final-integration.component.html',
  styleUrls: ['./final-integration.component.css']
})
export class FinalIntegrationComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  is_edit: boolean
  assiging_for_edit: Assigning = new Assigning()
  shift_name: string
  ward_name: string
  day: string
  subject: string
  message: string
  current_shift_in_day_id: number
  current_ward: number
  l_roles = []
  is_activated:boolean
  l_to_replace: Array<string> = new Array<string>()
  success_message:string
  constructor(private ward_service: WardService,private integration_service:IntegrationService, private employees_role_service: EmployeesRoleService, private shift_service: ShiftsService, private assigning_service: AssigningService, private employee_service: EmployeesService) { }

  ngOnInit() {
    this.is_activated = false
    this.integration_service.toChange = true
  }

  getEmployeeName(id: string) {
    let name;
    name = this.employee_service.list_employees.find(x => x.id == id).name
    return name
  }

  getAssigningForDay(day: string, shift_id: number, department_id: number) {
    let shift_in_day_id = this.shift_service.list_shifts_in_day.find(x => x.day == day && shift_id == x.shift_id).id
    let current = this.assigning_service.list_assigning.filter(x => x.shift_in_day_id == shift_in_day_id && x.department_id == department_id)
    let l_employees_names: Array<String> = new Array<String>()
    current.map(x => {
      l_employees_names.push(this.getEmployeeName(x.employee_id))
    })
    return l_employees_names
  }
  Edit(shift_id: number, day: string, ward_id: number) {
    this.is_edit = true
    this.shift_name = this.shift_service.list_shifts.find(x => x.id == shift_id).name
    this.ward_name = this.ward_service.list_wards.find(x => x.id == ward_id).name
    this.current_ward = ward_id
    this.day = day
    let shift_in_day_id = this.shift_service.list_shifts_in_day.find(x => x.shift_id == shift_id && x.day == day).id
    this.current_shift_in_day_id = shift_in_day_id
    this.assigning_service.GetAssingingByRoles(this.current_shift_in_day_id, this.current_ward).subscribe(data => {
      if (data) {
        this.assigning_service.current_employees_assigned_grouped_by_role = data
        this.assigning_service.GetEmployeesForReplacing(shift_in_day_id).subscribe(res => {
          if (res)
            this.assigning_service.list_employee_for_replacing = res
        })
      }
    })

  }
  roleName(role_id: number) {
    return this.employees_role_service.list_roles.find(x => x.id == role_id).role
  }

  activateAssigning() {
    this.is_activated = true
    this.assigning_service.ActivateAssigning().subscribe(data => {
      if (data) {
        this.assigning_service.list_assigning = data
        this.is_activated = false
      }
    })
  }
  sendCheckingEmail() {
    let l_for_sending = []
    this.l_roles.map(role => {
      this.assigning_service.list_employee_for_replacing[role].map(employee =>
        l_for_sending.push(employee)
      )
    })
    this.employee_service.sendEmail(l_for_sending, this.subject, this.message).subscribe()
    this.is_edit = false
  }
  AddToListForSending(role_id: number) {
    this.l_roles.push(role_id)
  }

  AddToReplacingList(employee_id: string) {
    this.l_to_replace.push(employee_id)
  }
  Replace() {
    let assigning = this.assigning_service.list_assigning.find(x => x.department_id == this.current_ward && x.shift_in_day_id == this.current_shift_in_day_id && x.employee_id == this.l_to_replace[1])
    this.assigning_service.EditAssinging(assigning, this.l_to_replace[0]).subscribe(async data => {
      if (data)
        {
          this.assigning_service.list_assigning = data
          this.l_to_replace.splice(0)
          this.success_message = "השיבוץ עודכן בהצלחה"
          await new Promise(resolve => setTimeout(resolve, 1000));
          this.is_edit = false
        }
    })
  }
}
