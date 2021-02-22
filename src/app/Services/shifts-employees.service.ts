import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShiftEmployees } from '../Classes/ShiftEmployee';
import { BusinessService } from './business.service';
import { EmployeesRoleService } from './employees-role.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftsEmployeesService {

  url: string = "http://localhost:50744/api/ShiftsEmployees/"
  employee_in_shift: ShiftEmployees = new ShiftEmployees()
  list_employees_in_shift :Array<ShiftEmployees> = new Array<ShiftEmployees>()
  constructor(private http: HttpClient, private business_service:BusinessService, private employees_roles_service:EmployeesRoleService) { }
  //פונקציה לשליפת רשימת עובדים ומשמרות
  public GetAll(): Observable<Array<ShiftEmployees>> {
    return this.http.get<Array<ShiftEmployees>>(this.url + "GetAllShiftsEmployees/" + this.business_service.business.id)
  }
  //פונקציה לשליפת רשומה מטבלת עובדים במשמרות ע"י קוד
  public GetOneById(id: number): Observable<ShiftEmployees> 
  {
    return this.http.get<ShiftEmployees>(this.url + "GetShiftEmployeeById/" + id)
  }
  //פונקציה להוספת רשומה לטבלת עובדים ומשמרות
  public Add(): Observable<Array<ShiftEmployees>> 
  {
    this.employee_in_shift.business_id = this.business_service.business.id
    return this.http.put<Array<ShiftEmployees>>(this.url + "AddShiftEmployee", this.employee_in_shift)
  }
  //פונקציה לעדכון רשומה בטבלה עובדים ומשמרות
  public Update(s: ShiftEmployees): Observable<Array<ShiftEmployees>> 
  {
    return this.http.post<Array<ShiftEmployees>>(this.url + "UpdateShiftEmployee", s)
  }
  //פונקציה למחיקת רשומה בטבלת עובדים ומשמרות
  public Delete(id: number): Observable<Array<ShiftEmployees>> 
  {
    return this.http.delete<Array<ShiftEmployees>>(this.url + "DeleteShiftEmployee/"+ id)
  }
}
