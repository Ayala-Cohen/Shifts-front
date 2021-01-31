import { Component, OnInit } from '@angular/core';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit {

  constructor(private ward_service:WardService) { }

  ngOnInit(): void {
  }
  importData()
  {

  }

}
