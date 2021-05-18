import { Component, OnInit } from '@angular/core';
import { Rating } from 'src/app/Classes/Rating';
import { EmployeesService } from 'src/app/Services/employees.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

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
  max_value_for_prefere = 4
  max_value_for_can_not = 3
  message: string
  constructor(private integration_service: IntegrationService, private employee_service: EmployeesService, private shift_service: ShiftsService, private ward_service: WardService) {
    this.rating_color.set("מעדיף", "rgb(212, 241, 255)")
    this.rating_color.set("יכול", "rgb(152, 200, 210)")
    this.rating_color.set("לא יכול", "rgb(120, 157, 163)")
    this.rating_color.set("מעדיף שלא", "rgb(74, 152, 190)")
  }

  ngOnInit() {
    this.initalizeCanNotAndNotPrefereCounters()
  }

  initalizeCanNotAndNotPrefereCounters() {
    this.cnt_can_not = this.integration_service.list_rating.filter(x => x.rating == "לא יכול").length
    if (this.cnt_can_not > this.max_value_for_can_not)
      this.message = `לא ניתן לדרג יותר מ ${this.max_value_for_can_not} משמרות בדירוג לא יכול`
    this.cnt_not_prefere = this.integration_service.list_rating.filter(x => x.rating == "מעדיף שלא").length
    if (this.cnt_not_prefere > this.max_value_for_prefere)
      this.message = `לא ניתן לדרג יותר מ ${this.max_value_for_prefere} משמרות בדירוג מעדיף שלא`
  }

  changeDirectiveColor(r: string) {
    this.integration_service.color = this.rating_color[r]
    this.integration_service.rating.rating = r
  }
  checkIfDiaryIsClosed() {
    let current_date = new Date().getTime()
    let closing_date = new Date(this.ward_service.list_wards[0].diary_closing_day)
    let difference = (closing_date.getTime() - current_date) / (1000 * 3600 * 24)
    return difference <= 0
  }
  AddOrUpdate(shift_id: number, day: string, event: Event) {
    if (!this.checkIfDiaryIsClosed()) {
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
          if (this.cnt_can_not > this.max_value_for_can_not) {
            event.preventDefault()
            flag = false
            this.message = `לא ניתן לדרג יותר מ ${this.max_value_for_can_not} משמרות בדירוג לא יכול`
          }
        }
        if (this.integration_service.rating.rating == "מעדיף שלא") {
          this.cnt_not_prefere++
          if (this.cnt_not_prefere > this.max_value_for_prefere) {
            event.preventDefault()
            flag = false
            this.message = `לא ניתן לדרג יותר מ ${this.max_value_for_prefere} משמרות בדירוג מעדיף שלא`
          }

        }
        if (flag) {
          this.integration_service.Add(shift_id, day).subscribe(data => {
            if (data)
              this.integration_service.list_rating = data
          })
        }
      }
      else {
        this.integration_service.Delete(shift_in_day_id, employee_id).subscribe(data => {
          if (data) {
            this.integration_service.list_rating = data
            this.message = ""
            this.initalizeCanNotAndNotPrefereCounters()
          }
          else
            console.log("failed to update");

        })
      }
      let prev_rating = this.integration_service.rating.rating
      this.integration_service.rating = new Rating()
      this.integration_service.rating.rating = prev_rating
    }
    else {
      this.integration_service.toChange = false
      this.message = "היומן סגור, לא ניתן להכניס או לשנות דירוגים"
      event.preventDefault()
    }
  }
  //פונקציה לשליפת דירוג על מנת להציג אותו גם אם העובד יצא מהמערכת באמצע הדירוג
  getRatingColor(shift_id: number, day: string) {
    if (this.cnt_not_prefere == 0 && this.cnt_can_not == 0) {
      this.initalizeCanNotAndNotPrefereCounters()
    }
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
