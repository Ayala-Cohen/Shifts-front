import { Component, OnInit } from '@angular/core';
import {  IntegrationService } from 'src/app/Services/integration.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]

  constructor(private integration_service :IntegrationService, private ward_service:WardService) { }

  ngOnInit() {
  }
  changeDirectiveColor(color:string)
  {
    debugger
    this.integration_service.color = color
  }

}
