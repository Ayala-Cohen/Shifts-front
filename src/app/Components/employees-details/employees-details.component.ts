import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { WardService } from 'src/app/Services/ward.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ward } from 'src/app/Classes/Ward';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit {
  fileToUpload: File = null;
  is_success: boolean = false
  is_edit: string
  list_dep: Array<Ward> = new Array<Ward>()
  constructor(private router: Router, private active: ActivatedRoute, private ward_service: WardService, private employee_service: EmployeesService, private employee_roles_service: EmployeesRoleService) {
    this.active.params.subscribe(p => {
      this.is_edit = p["flag"]
      if (this.is_edit == "false")
        this.employee_service.employee = new Employee()

    })
  }

  ngOnInit(): void {
  }
  AddTolistDep(ward: Ward) {
    this.list_dep.push(ward)
  }
  saveFile(files: FileList) {
    this.fileToUpload = files.item(0);
    this.employee_service.formData.append('employeesListXL', this.fileToUpload, this.fileToUpload.name);
  }
  importData() {
    this.employee_service.ImportFromExcel().subscribe(data => { this.employee_service.list_employees = data })
    this.router.navigate(['/employees-list'])
  }

  AddEditEmployee() {
    this.employee_service.AddDepartments(this.list_dep).subscribe()
    if (this.employee_service.employee.id == undefined) {
      this.employee_service.Add().subscribe(data => this.employee_service.list_employees = data)
      this.employee_service.employee = new Employee()
    }
    else {
      this.employee_service.Update().subscribe(data => this.employee_service.list_employees = data)
    }
    this.is_success = true
  }

}
