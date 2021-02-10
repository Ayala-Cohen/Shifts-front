import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeesRole } from '../Classes/EmployeesRole';

@Injectable({
  providedIn: 'root'
})
export class EmployeesRoleService {

  url: string = "http://localhost:50744/api/Roles/"
  constructor(private http: HttpClient) { }
  //פונקציה לשליפת רשימת תפקידי עובדים
  public GetAll(): Observable<Array<EmployeesRole>> {
    return this.http.get<Array<EmployeesRole>>(this.url + "GetAllRoles")
  }
  //פונקציה לשליפת תפקיד ע"י קוד
  public GetOneById(id: number): Observable<EmployeesRole> 
  {
    return this.http.get<EmployeesRole>(this.url + "GetRoleById/" + id)
  }
  //פונקציה להוספת תפקיד
  public Add(r: EmployeesRole): Observable<Array<EmployeesRole>> 
  {
    return this.http.put<Array<EmployeesRole>>(this.url + "AddRole", r)
  }
  //פונקציה לעדכון תפקיד
  public Update(r: EmployeesRole): Observable<Array<EmployeesRole>> 
  {
    return this.http.post<Array<EmployeesRole>>(this.url + "UpdateRole", r)
  }
  //פונקציה למחיקת תפקיד
  public Delete(id: number): Observable<Array<EmployeesRole>> 
  {
    return this.http.delete<Array<EmployeesRole>>(this.url + "DeleteRole/"+id)
  }
}
