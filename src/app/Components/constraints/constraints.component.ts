import { Component, OnInit } from '@angular/core';
import { Constraint } from 'src/app/Classes/Constraint';
import { ConstraintsService } from 'src/app/Services/constraints.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]
  shift_can_not = ""
  constructor(private shift_service: ShiftsService, private constraint_service: ConstraintsService) {
    shift_service.GetAll().subscribe(data=>shift_service.list_shifts = data)
   }

  ngOnInit(): void {
  }
  AddOrUpdate(shift_id: number, day: string) {
    this.constraint_service.c.shift_id = shift_id
    this.constraint_service.c.day = day
    this.getShiftName(shift_id)
    this.constraint_service.Add().subscribe(data => {this.constraint_service.list_constraints = data })
    this.constraint_service.c = new Constraint()
  }
  getShiftName(shift_id:number)
  {
      this.shift_service.GetOneById(shift_id).subscribe(data=>this.shift_can_not = data.name)
  }

}
