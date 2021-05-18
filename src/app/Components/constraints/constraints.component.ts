import { Component, OnInit } from '@angular/core';
import { Constraint } from 'src/app/Classes/Constraint';
import { ConstraintsService } from 'src/app/Services/constraints.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsService } from 'src/app/Services/shifts.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  message = ""
  max_can_not = 3
  len_of_constraints: number
  constructor(private shift_service: ShiftsService, private constraint_service: ConstraintsService, private integration_service: IntegrationService, private employee_service: EmployeesService) {
    integration_service.color = "rgb(120, 157, 163)"
  }

  ngOnInit(): void {
    this.len_of_constraints = this.constraint_service.list_constraints.length
    this.constraint_service.GetNumberOfConstraintsPerShift().subscribe(data => {
      if (data)
        this.constraint_service.constraints_in_shift = data
    })
    this.constraint_service.GetLimitForConstraint().subscribe(data => {
      if (data != -1)
        this.constraint_service.limit = data
    })
  }
  AddOrRemove(shift_id: number, day: string, event: Event) {
    this.message = ""
    this.constraint_service.c.shift_id = shift_id
    this.constraint_service.c.day = day
    if (this.constraint_service.list_constraints.find(x => x.day == day && x.shift_id == shift_id) != undefined)
      this.constraint_service.Delete(shift_id, day).subscribe(data => {
        this.constraint_service.toChange = true
        if (data)
          this.constraint_service.list_constraints = data
      })
    else {
      let shift_in_day_id = this.shift_service.list_shifts_in_day.find(x => x.shift_id == shift_id && x.day == day).id
      let constraint_in_shift = this.constraint_service.constraints_in_shift[this.employee_service.employee.role_id]
      if (constraint_in_shift)
        if (constraint_in_shift[shift_in_day_id] >= this.constraint_service.limit) {
          this.constraint_service.toChange = false
          event.preventDefault()
          this.message = `לא ניתן לקבוע אילוץ קבוע במשמרת זו היות ועובדים אחרים כבר סימנו אותה באילוץ קבוע`
        }
        else {
          if (this.len_of_constraints >= this.max_can_not) {
            this.constraint_service.toChange = false
            event.preventDefault()
            this.message = `לא ניתן לקבוע יותר מ ${this.max_can_not} משמרות`
          }
          else {
            this.constraint_service.Add().subscribe(data => {
              if (data)
                this.constraint_service.list_constraints = data
              this.len_of_constraints = data.length
            })
          }
        }
    }
    this.constraint_service.c = new Constraint()
    this.constraint_service.GetNumberOfConstraintsPerShift().subscribe(data => {
      if (data)
        this.constraint_service.constraints_in_shift = data
    })
  }


  isHasConstraint(shift_id: number, day: string) {
    let l_constraint = this.constraint_service.list_constraints
    if (l_constraint.find(x => x.day == day && shift_id == x.shift_id) != undefined)
      return "rgb(120, 157, 163)"
    return "rgb(255, 255, 255)"
  }
}
