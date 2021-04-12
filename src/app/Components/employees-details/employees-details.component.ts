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
      else
        this.employee_service.getDepartments(this.employee_service.employee.id).subscribe(data => {
          if (data)
            this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments = data
        })
    })
  }

  ngOnInit(): void {
  }
  AddTolistDepOrRemove(ward: Ward) {
    let l_dep = this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments
    if (l_dep == null)
      l_dep = new Array<Ward>();
    if (l_dep.find(x => x.id == ward.id) == undefined)
      this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments.push(ward)
    else {
      this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments.slice(this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments.indexOf(ward), 1)
    }
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
  this.employee_service.AddOrRemoveDepartments().subscribe()
  if (this.employee_service.employee.id == undefined) {
    this.employee_service.Add().subscribe(data => this.employee_service.list_employees = data)
    this.employee_service.employee = new Employee()
  }
  else {
    this.employee_service.Update().subscribe(data => this.employee_service.list_employees = data)
  }
  this.is_success = true
}
isInThisDep(dep_id: number) {
  let list_dep = this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments
  if (list_dep != null) {
    let dep = list_dep.find(x => x.id == dep_id)
    return dep != undefined
  }
}
}
