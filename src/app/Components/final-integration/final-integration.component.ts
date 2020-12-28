import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-final-integration',
  templateUrl: './final-integration.component.html',
  styleUrls: ['./final-integration.component.css']
})
export class FinalIntegrationComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]

  constructor() { }

  ngOnInit() {
  }

}
