import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WardService } from 'src/app/Services/ward.service';
import { BusinessService } from 'src/app/Services/business.service';
import { ShiftsService } from 'src/app/Services/shifts.service';

@Component({
  selector: 'app-wards-and-shifts',
  templateUrl: './wards-and-shifts.component.html',
  styleUrls: ['./wards-and-shifts.component.css']
})
export class WardsAndShiftsComponent implements OnInit {
  constructor(private router:Router,private ward_service:WardService,private shift_service:ShiftsService, private business_service:BusinessService) { }

  ngOnInit() {
  }
  next()
  {
    //קישור המחלקות והמשמרות לעסק
    this.shift_service.list_shifts.forEach(shift => {
      shift.business_id = this.business_service.business.id
      this.shift_service.Add(shift).subscribe(data=>{},err=>alert("כשל בגישה לשרת"))
    });

    this.ward_service.list_wards.forEach(ward=> {
      ward.business_id = this.business_service.business.id
    })
    this.router.navigate(['ward'])
  }

}
