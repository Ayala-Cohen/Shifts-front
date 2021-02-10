import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/Services/business.service';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.css']
})
export class DirectorDetailsComponent implements OnInit {

  constructor(private router: Router, private business_service:BusinessService) { }
  ngOnInit() {
  }
  next()
  {  
    this.router.navigate(['business-details'])
  }

}
