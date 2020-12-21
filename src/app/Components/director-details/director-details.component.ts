import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-director-details',
  templateUrl: './director-details.component.html',
  styleUrls: ['./director-details.component.css']
})
export class DirectorDetailsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }
  next()
  {
    this.router.navigate(['business-details'])
  }

}
