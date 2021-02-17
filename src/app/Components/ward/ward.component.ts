import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]
  list_tasks: Array<string> = new Array<string>();

  constructor(private router: Router, private ward_service: WardService, private shift_service: ShiftsService) { }

  ngOnInit(): void {
  }
  next() {
    this.router.navigate(['employees-details'])
  }
}
