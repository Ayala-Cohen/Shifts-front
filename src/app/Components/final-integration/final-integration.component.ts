import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-final-integration',
  templateUrl: './final-integration.component.html',
  styleUrls: ['./final-integration.component.css']
})
export class FinalIntegrationComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]

  constructor(private ward_service:WardService) { }

  ngOnInit() {
  }

}
