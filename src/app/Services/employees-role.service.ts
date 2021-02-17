import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeesRole } from '../Classes/EmployeesRole';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeesRoleService {

  url: string = "http://localhost:50744/api/Roles/"
  list_roles: Array<EmployeesRole> = new Array<EmployeesRole>()
  role:EmployeesRole = new EmployeesRole();
  constructor(private http: HttpClient, private business_service: BusinessService) { 
  }
  //פונקציה לשליפת רשימת תפקידי עובדים
  public GetAll(): Observable<Array<EmployeesRole>> {
    return this.http.get<Array<EmployeesRole>>(this.url + "GetAllRoles/" + this.business_service.business.id)
  }
  //פונקציה לשליפת תפקיד ע"י קוד
  public GetOneById(id: number): Observable<EmployeesRole> {
    return this.http.get<EmployeesRole>(this.url + "GetRoleById/" + id)
  }
  //פונקציה להוספת תפקיד
  public Add(): Observable<Array<EmployeesRole>> {
    this.role.business_id = this.business_service.business.id
    return this.http.put<Array<EmployeesRole>>(this.url + "AddRole", this.role)
  }
  //פונקציה לעדכון תפקיד
  public Update(r: EmployeesRole): Observable<Array<EmployeesRole>> {
    return this.http.post<Array<EmployeesRole>>(this.url + "UpdateRole", r)
  }
  //פונקציה למחיקת תפקיד
  public Delete(id: number): Observable<Array<EmployeesRole>> {
    return this.http.delete<Array<EmployeesRole>>(this.url + "DeleteRole/" + id)
  }
}
