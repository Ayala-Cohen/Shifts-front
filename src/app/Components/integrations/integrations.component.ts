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
  constructor(private integration_service: IntegrationService, private employee_service: EmployeesService, private shift_service: ShiftsService) {
    this.rating_color.set("מעדיף", "rgb(212, 241, 255)")
    this.rating_color.set("יכול", "rgb(152, 200, 210)")
    this.rating_color.set("לא יכול", "rgb(120, 157, 163)")
    this.rating_color.set("מעדיף שלא", "rgb(74, 152, 190)")
  }

  ngOnInit() {
  }

  changeDirectiveColor(r: string) {
    this.integration_service.color = this.rating_color[r]
    this.integration_service.rating.rating = r
  }
  AddOrUpdate(shift_id: number, day: string) {

    if (this.integration_service.rating.employee_id == undefined && this.integration_service.rating.shift_in_day == undefined) {
      this.integration_service.rating.shift_approved = false
      this.integration_service.Add(shift_id, day).subscribe(data => {
        if (data)
          this.integration_service.list_rating = data
      })
    }
    else {
      this.integration_service.Update().subscribe(data => {
        if (data)
          this.integration_service.list_rating = data
        else
          console.log("failed to update");

      })
    }
    this.integration_service.rating = new Rating()
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
