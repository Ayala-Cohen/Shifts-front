import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';
import {  IntegrationService } from 'src/app/Services/integration.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-integrations',
  templateUrl: './integrations.component.html',
  styleUrls: ['./integrations.component.css']
})
export class IntegrationsComponent implements OnInit {
  activity_days = ["ראשון", "שני","שלישי","רביעי","חמישי","שישי","שבת"]

  constructor(private integration_service :IntegrationService, private ward_service:WardService,private employee_service:EmployeesService,private shift_service:ShiftsService) { 
    ward_service.GetAll().subscribe(data=>ward_service.list_wards = data)
    shift_service.GetAll().subscribe(data=>shift_service.list_shifts = data)
  }

  ngOnInit() {
  }
  changeDirectiveColor(color:string, r:string)
  {
    this.integration_service.color = color
    this.integration_service.rating.rating = r
  }
  AddOrUpdate(shift_id:number, day:string)
  {

    //change according to the primary key
    if(this.integration_service.rating.employee_id == undefined)
    {
      this.integration_service.rating.shift_approved = false
      this.integration_service.Add(shift_id).subscribe(data=>this.integration_service.list_rating = data)
    }
      // else //check by what to move the current shift to rating
      // this.integration_service.rating = 
    }

}
