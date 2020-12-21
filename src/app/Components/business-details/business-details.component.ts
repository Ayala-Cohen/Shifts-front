import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business-details',
  templateUrl: './business-details.component.html',
  styleUrls: ['./business-details.component.css']
})
export class BusinessDetailsComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit() {
  }
  next()
  {
    this.router.navigate(['wards-shifts'])
  }

}
