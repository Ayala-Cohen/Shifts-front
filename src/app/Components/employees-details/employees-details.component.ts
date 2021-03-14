import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { WardService } from 'src/app/Services/ward.service';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit {
  fileToUpload: File = null;
  constructor(private ward_service: WardService,private employee_service:EmployeesService,private employee_roles_service:EmployeesRoleService) { }

  ngOnInit(): void {
  }
  saveFile(files: FileList) {
    this.fileToUpload = files.item(0); 
    this.employee_service.formData.append('employeesListXL', this.fileToUpload, this.fileToUpload.name);
  }
  importData() {
    this.employee_service.ImportFromExcel(this.fileToUpload.name).subscribe(data=>{this.employee_service.list_employees = data})
  }

  AddEmployee()
  {
    this.employee_service.Add().subscribe(data=>this.employee_service.list_employees = data)
    this.employee_service.employee = new Employee()
  }

}
