import { Component, OnInit } from '@angular/core';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-final-integration',
  templateUrl: './final-integration.component.html',
  styleUrls: ['./final-integration.component.css']
})
export class FinalIntegrationComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

  constructor(private ward_service:WardService, private shift_service:ShiftsService) { }

  ngOnInit() {
  }

}
