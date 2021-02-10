import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/Services/business.service';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {
  constructor(private router:Router, private business_service:BusinessService) { }
  ngOnInit() {
  }
  next()
  {
    this.business_service.Add().subscribe(data=>{}, err=>alert("כשל בגישה לשרת"))
    this.router.navigate(['wards-shifts'])
  }

}
