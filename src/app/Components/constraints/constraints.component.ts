import { Component, OnInit } from '@angular/core';
import { Constraint } from 'src/app/Classes/Constraint';
import { ConstraintsService } from 'src/app/Services/constraints.service';
import { IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  weeks = [0, 1, 2, 3]
  shift_can_not = ""
  currentDay: string
  constructor(private shift_service: ShiftsService, private constraint_service: ConstraintsService, private integration_service: IntegrationService) {
    shift_service.GetAll().subscribe(data => shift_service.list_shifts = data)
    shift_service.getAllShiftsInDay().subscribe(data => shift_service.list_shifts_in_day = data)
    constraint_service.GetAll().subscribe(data => {
      this.constraint_service.list_constraints = data
    })
    integration_service.color = "rgb(120, 157, 163)"
  }

  ngOnInit(): void {
  }
  UpdateDay(day: string) {
    this.currentDay = day
  }
  AddOrRemove(shift_id: number, day: string) {
    this.constraint_service.c.shift_id = shift_id
    this.constraint_service.c.day = day
    if (this.constraint_service.list_constraints.find(x => x.day == day && x.shift_id == shift_id) != undefined)
      this.constraint_service.Delete(shift_id, day).subscribe(data => this.constraint_service.list_constraints = data)
    else
      this.constraint_service.Add().subscribe(data => { this.constraint_service.list_constraints = data })
    this.constraint_service.c = new Constraint()
  }

  isHasConstraint(shift_id: number, day: string) {
    let l_constraint = this.constraint_service.list_constraints
    if (l_constraint.find(x => x.day == day && shift_id == x.shift_id) != undefined)
      return "rgb(120, 157, 163)"
    return "rgb(255, 255, 255)"
  }

  getShiftName(shift_id: number) {
    this.shift_service.GetOneById(shift_id).subscribe(data => this.shift_can_not = data.name)
  }

}
