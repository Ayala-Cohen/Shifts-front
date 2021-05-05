import { Component, OnInit } from '@angular/core';
import { Rating } from 'src/app/Classes/Rating';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsService } from 'src/app/Services/shifts.service';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  rating_color: Map<string, string> = new Map<string, string>()
  cnt_can_not
  cnt_not_prefere
  max_value_for_prefere = 5
  max_value_for_can_not = 4
  message: string
  constructor(private integration_service: IntegrationService, private employee_service: EmployeesService, private shift_service: ShiftsService) {
    this.rating_color.set("מעדיף", "rgb(212, 241, 255)")
    this.rating_color.set("יכול", "rgb(152, 200, 210)")
    this.rating_color.set("לא יכול", "rgb(120, 157, 163)")
    this.rating_color.set("מעדיף שלא", "rgb(74, 152, 190)")
    this.cnt_can_not = integration_service.list_rating.filter(x => x.rating == "לא יכול").length
    if (this.cnt_can_not > 4)
      this.message = "לא ניתן לדרג יותר מ 4 משמרות בדירוג לא יכול"
    this.cnt_not_prefere = integration_service.list_rating.filter(x => x.rating == "מעדיף שלא").length
    if (this.cnt_not_prefere > 5)
      this.message = "לא ניתן לדרג יותר מ 5 משמרות בדירוג מעדיף שלא"

  }

  ngOnInit() {
  }

  changeDirectiveColor(r: string) {
    this.integration_service.color = this.rating_color[r]
    this.integration_service.rating.rating = r
  }
  AddOrUpdate(shift_id: number, day: string, event: Event) {
    let flag = true
    let shift_in_day_id
    let shift_in_day = this.shift_service.list_shifts_in_day.find(x => x.day == day && x.shift_id == shift_id)
    if (shift_in_day)
       shift_in_day_id = shift_in_day.id
    let employee_id = this.employee_service.employee.id
    if (!this.integration_service.list_rating.find(x => x.shift_in_day == shift_in_day_id && x.employee_id == employee_id)) {
      this.integration_service.rating.shift_approved = false
      this.integration_service.rating.shift_in_day = shift_in_day_id
      if (this.integration_service.rating.rating == "לא יכול") {
        this.cnt_can_not++
        if (this.cnt_can_not > 4) {
          event.preventDefault()
          flag = false
          this.message = "לא ניתן לדרג יותר מ 4 משמרות בדירוג לא יכול"
        }
      }
      if (this.integration_service.rating.rating == "מעדיף שלא") {
        this.cnt_not_prefere++
        if (this.cnt_not_prefere > 5) {
          event.preventDefault()
          flag = false
          this.message = "לא ניתן לדרג יותר מ 5 משמרות בדירוג מעדיף שלא"
        }

      }
      if (flag) {
        this.integration_service.Add(shift_id, day).subscribe(data => {
          if (data)
            this.integration_service.list_rating = data
        })
      }
      // else
      //   this.integration_service.list_rating.splice(this.integration_service.list_rating.lastIndexOf(), 1)
    }
    else {
      this.integration_service.Delete(shift_in_day_id, employee_id).subscribe(data => {
        if (data)
          this.integration_service.list_rating = data
        else
          console.log("failed to update");

      })
    }
    let prev_rating = this.integration_service.rating.rating
    this.integration_service.rating = new Rating()
    this.integration_service.rating.rating = prev_rating
  }
  //פונקציה לשליפת דירוג על מנת להציג אותו גם אם העובד יצא מהמערכת באמצע הדירוג
  getRatingColor(shift_id: number, day: string) {
    let l_rating = this.integration_service.list_rating
    let shift_in_day_id
    let shift_in_day = this.shift_service.list_shifts_in_day.find(x => x.shift_id == shift_id && day == x.day)
    if (shift_in_day) {
      shift_in_day_id = shift_in_day.id
      if (l_rating) {
        let rating = l_rating.find(x => x.shift_in_day == shift_in_day_id)
        if (rating)
          return this.rating_color.get(rating.rating)
      }
    }
    return "rgb(255, 255, 255)"
  }

}
