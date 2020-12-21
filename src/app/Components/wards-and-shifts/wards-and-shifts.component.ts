import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wards-and-shifts',
  templateUrl: './wards-and-shifts.component.html',
  styleUrls: ['./wards-and-shifts.component.css']
})
export class WardsAndShiftsComponent implements OnInit {
  num_shifts :number = 0
  // לשנות על פי מספר המשמרות שיוכנסו
  l_shifts = new Array(0, 1, 2) 
  constructor(private router:Router) { }

  ngOnInit() {
  }
  next()
  {
    this.router.navigate(['ward'])
  }

}
