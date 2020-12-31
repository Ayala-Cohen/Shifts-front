import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-wards-and-shifts',
  templateUrl: './wards-and-shifts.component.html',
  styleUrls: ['./wards-and-shifts.component.css']
})
export class WardsAndShiftsComponent implements OnInit {
  // לשנות על פי מספר המשמרות שיוכנסו
  constructor(private router:Router,private ward_service:WardService) { }

  ngOnInit() {
  }
  next()
  {
    this.router.navigate(['ward'])
  }

}
