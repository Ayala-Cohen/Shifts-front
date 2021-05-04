import { Component, OnInit } from '@angular/core';
import { EmployeesRoleService } from 'src/app/Services/employees-role.service';
import { Router } from '@angular/router'
import { EmployeesRole } from 'src/app/Classes/EmployeesRole';
import { dashCaseToCamelCase } from '@angular/compiler/src/util';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private employees_role_service: EmployeesRoleService, private router: Router) { }

  ngOnInit() {
  }
  edit(id:number)
  {
    let role = this.employees_role_service.list_roles.find(x=>x.id == id)
    this.employees_role_service.role = role
  }
  AddOrUpdate() {
    //הוספת תפקיד חדש
    if (this.employees_role_service.role.id == undefined) {
      this.employees_role_service.Add().subscribe(data =>{if(data) this.employees_role_service.list_roles = data})
      this.employees_role_service.role = new EmployeesRole(0, 0, "", 0)
    }
    //עריכת תפקיד קיים
    else {
      this.employees_role_service.Update().subscribe(data =>{if(data) this.employees_role_service.list_roles = data})
    }
  }

  delete(id:number)
  {
    this.employees_role_service.Delete(id).subscribe(data =>{if(data) this.employees_role_service.list_roles = data})
  }
  next() {
    if (this.employees_role_service.role.role != undefined)//הוספת התפקיד האחרון אם לא לחצו על כפתור ההוספה
      this.AddOrUpdate()
    this.router.navigate(['wards-shifts'])
  }

}
