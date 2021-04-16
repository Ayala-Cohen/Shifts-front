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
    // if (this.assigning_service.list_assigning == undefined)
      this.assigning_service.getAssigning().subscribe(data => this.assigning_service.list_assigning = data)
  }

  getEmployeeName(id: string) {
    let name;
    name = this.employee_service.list_employees.find(x => x.id == id).name
    return name
  }

  getAssigningForDay(day: string, shift_id: number, department_id: number) {
    let shift_in_day_id = this.shift_service.list_shifts_in_day.find(x => x.day == day && shift_id == x.shift_id).id
    let current = this.assigning_service.list_assigning.filter(x => x.shift_in_day_id == shift_in_day_id && x.department_id == department_id)
    let l_employees_names: Array<String> = new Array<String>()
    current.map(x => {
      l_employees_names.push(this.getEmployeeName(x.employee_id))
    })
    return l_employees_names
  }
}
