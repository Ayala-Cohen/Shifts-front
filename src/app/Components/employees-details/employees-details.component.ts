import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/Classes/Employee';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { EmployeesService } from 'src/app/Services/employees.service';
import { WardService } from 'src/app/Services/ward.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ward } from 'src/app/Classes/Ward';
import { EmployeeWithWholeData } from 'src/app/Classes/EmployeeWithWholeData';

@Component({
  selector: 'app-employees-details',
  templateUrl: './employees-details.component.html',
  styleUrls: ['./employees-details.component.css']
})
export class EmployeesDetailsComponent implements OnInit {
  fileToUpload: File = null;
  is_success: boolean = false
  is_edit: string
  l_dep: Array<Ward> = new Array<Ward>()
  constructor(private router: Router, private active: ActivatedRoute, private ward_service: WardService, private employee_service: EmployeesService, private employee_roles_service: EmployeesRoleService) {
    this.active.params.subscribe(p => {
      this.is_edit = p["flag"]
      if (this.is_edit == "false") {
        if (this.employee_service.list_employees_whole_data.size == 0)
          this.employee_service.list_employees.map(x => {
            this.employee_service.list_employees_whole_data.set(x.id, new EmployeeWithWholeData(x))
          })
        this.employee_service.employee = new Employee()
      }
      else
        //שליפת המחלקות בהן העובד עובד
        this.employee_service.getDepartments(this.employee_service.employee.id).subscribe(data => {
          if (data)
            this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments = data
        })
    })
  }

  ngOnInit(): void {
  }

  //פונקציה לשמירת קובץ שיכיל את נתוני העובדים
  saveFile(files: FileList) {
    this.fileToUpload = files.item(0);
    this.employee_service.formData.append('employeesListXL', this.fileToUpload, this.fileToUpload.name);
  }

  //פונקציה להכנסת הנתונים מהקובץ
  importData() {
    this.employee_service.ImportFromExcel().subscribe(data => { this.employee_service.list_employees = data })
    this.router.navigate(['/employees-list'])
  }
  //פונקציה להוספת או עריכת עובד
  AddEditEmployee() {
    if (this.employee_service.employee.password == undefined) {
      this.employee_service.Add().subscribe(data => this.employee_service.list_employees = data)
      let newEmployee = this.employee_service.list_employees.find(x => x.id == this.employee_service.employee.id)
      let role = this.employee_roles_service.list_roles.find(x => x.id == this.employee_service.employee.role_id)
      this.employee_service.list_employees_whole_data.set(this.employee_service.employee.id, new EmployeeWithWholeData(this.employee_service.employee, role, this.l_dep))
      this.employee_service.AddOrRemoveDepartments().subscribe(data=> 
        this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments = data
        )
      this.employee_service.employee = new Employee()
      this.l_dep = new Array<Ward>()
    }
    else {
      this.employee_service.AddOrRemoveDepartments().subscribe(data => { //עדכון רשימת המחלקות לעובד
        this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments = data
      })
      this.employee_service.Update().subscribe(data => this.employee_service.list_employees = data)
    }
    this.is_success = true
  }
  //פונקציה להוספת מחלקות עבור העובד
  AddTolistDepOrRemove(ward: Ward) {
    if (this.employee_service.employee.password != undefined) {
      let l_dep = this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments

      if (l_dep == null) {
        this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments = new Array<Ward>();
        l_dep = new Array<Ward>()
      }
      if (l_dep.find(x => x.id == ward.id) == undefined)
        this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments.push(ward)
      else {
        let index = this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments.findIndex(x => x.id == ward.id)
        this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id).list_departments.splice(index, 1)
      }
    }
    else
      this.l_dep.push(ward)
  }
  //פונקציה לבדיקה האם עובד עובד במחלקה מסוימת
  isInThisDep(dep_id: number) {
    let employee = this.employee_service.list_employees_whole_data.get(this.employee_service.employee.id)
    let list_dep
    if (employee != undefined) {
      list_dep = employee.list_departments
      if (list_dep != null) {
        let dep = list_dep.find(x => x.id == dep_id)
        return dep != undefined
      }
    }
  }
}
