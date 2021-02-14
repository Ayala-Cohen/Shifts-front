import { Component,  OnInit } from '@angular/core';
import { ShiftsService } from 'src/app/Services/shifts.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]
  shift_can_not =""
  constructor(private shift_service:ShiftsService) { }

  ngOnInit(): void {
  }
  Update(name_ward)
  {
    this.shift_can_not=name_ward
    debugger
  }

}
