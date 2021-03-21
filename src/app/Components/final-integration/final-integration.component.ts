import { Component, OnInit } from '@angular/core';
import { AssigningService } from 'src/app/Services/assigning.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { ShiftsService } from 'src/app/Services/shifts.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-final-integration',
  templateUrl: './final-integration.component.html',
  styleUrls: ['./final-integration.component.css']
})
export class FinalIntegrationComponent implements OnInit {
  activity_days = ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"]

  constructor(private ward_service: WardService, private shift_service: ShiftsService, private assigning_service: AssigningService, private employee_service: EmployeesService) { }

  ngOnInit() {
    this.assigning_service.getAssigning().subscribe(data => this.assigning_service.list_assigning = data)
  }

  getEmployeeName(id: string) {
    let name;
    this.employee_service.GetOneById(id).subscribe(data => name = data.name)
    return name
  }

  getAssigningForDay(day:string, shift_id:number) {
    let id;
    this.shift_service.GetShiftForDay(shift_id, day).subscribe(data=> id = data)
    this.assigning_service.list_assigning.filter(x=>x.shift_in_day_id == id)[0]
  }
}
