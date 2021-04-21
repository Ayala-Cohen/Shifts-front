import { Component, OnInit } from '@angular/core';
import { EmployeesService } from 'src/app/Services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.css']
})
export class EmployeesListComponent implements OnInit {

  constructor(private employees_service:EmployeesService) {
   
   }

  ngOnInit() {
  }

}
