import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.css']
})
export class ConstraintsComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]
  choice : string = ""
  constructor(private ward_service:WardService) { }

  ngOnInit(): void {
  }
  getChoice(ward:string)
  {

  }

}
