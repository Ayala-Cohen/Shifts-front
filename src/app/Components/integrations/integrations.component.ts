import { Component, OnInit } from '@angular/core';
import {  IntegrationService } from 'src/app/Services/integration.service';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  activity_days = [1, 2, 3, 4, 5, 6, 7]

  constructor(private integration_service :IntegrationService) { }

  ngOnInit() {
  }
  changeDirectiveColor(color:string)
  {
    debugger
    this.integration_service.color = color
  }

}
