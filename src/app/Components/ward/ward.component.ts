import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ward',
  templateUrl: './ward.component.html',
  styleUrls: ['./ward.component.css']
})
export class WardComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  changeColor() {

  }
  next()
  {
    this.router.navigate(['employees-details'])
  }
}
