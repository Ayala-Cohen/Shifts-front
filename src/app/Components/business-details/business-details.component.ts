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
    this.business_service.Add().subscribe(data=>{this.business_service.business = data.filter(x=>x.number == this.business_service.business.number)[0]}, err=>alert("כשל בגישה לשרת"))
    this.router.navigate(['roles'])
  }

}
