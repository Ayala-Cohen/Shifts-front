import { Component,  OnInit } from '@angular/core';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]
  shift_can_not =""
  constructor(private ward_service:WardService) { }

  ngOnInit(): void {
  }
  Update(name_ward)
  {
    this.shift_can_not=name_ward
    debugger
  }

}
