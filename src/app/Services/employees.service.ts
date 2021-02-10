import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Classes/Employee';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  url: string = "http://localhost:50744/api/Employees/"
  constructor(private http: HttpClient) { }
  //פונקציה לשליפת רשימת עובדים
  public GetAll(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.url + "GetAllEmployees")
  }
  //פונקציה לשליפת עובד ע"י קוד
  public GetOneById(id: string): Observable<Employee> 
  {
    return this.http.get<Employee>(this.url + "GetEmployeeById/" + id)
  }
  //פונקציה להוספת עובד
  public Add(e: Employee): Observable<Array<Employee>> 
  {
    return this.http.put<Array<Employee>>(this.url + "AddEmployee", e)
  }
  //פונקציה לעדכון עובד
  public Update(e: Employee): Observable<Array<Employee>> 
  {
    return this.http.post<Array<Employee>>(this.url + "UpdateEmployee", e)
  }
  //פונקציה למחיקת עובד
  public Delete(id: string): Observable<Array<Employee>> 
  {
    return this.http.delete<Array<Employee>>(this.url + "DeleteEmployee/"+ id)
  }
}
