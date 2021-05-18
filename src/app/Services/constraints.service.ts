import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constraint } from '../Classes/Constraint';
import { Observable } from 'rxjs';
import { EmployeesService } from './employees.service';

@Injectable({
  providedIn: 'root'
})
export class ConstraintsService {
  url: string = "http://localhost:50744/api/Constraints/"
  c: Constraint = new Constraint()
  list_constraints: Array<Constraint> = Array<Constraint>();
  limit: number
  toChange:boolean = true
  constraints_in_shift: Map<number,Map<number, number>> = new Map<number,Map<number, number>>()
  constructor(private http: HttpClient, private employee_service: EmployeesService) { }
  //פונקציה לשליפת רשימת אילוצים של עובד מסוים
  public GetAllOfEmployee(): Observable<Array<Constraint>> {
    return this.http.get<Array<Constraint>>(`${this.url}/GetAllConstraints/${this.employee_service.employee.id}`)
  }
  //פונקציה לשליפת האילוצים של כל העובדים
  public GetNumberOfConstraintsPerShift():Observable<Map<number,Map<number, number>>>
  {
    return this.http.get<Map<number,Map<number, number>>>(`${this.url}/GetNumberOfConstraintsPerShift/${this.employee_service.employee.business_id}`)
  }
  //פונקציה להחזרת הגבלה לאילוץ
  public GetLimitForConstraint():Observable<number>
  {
    return this.http.get<number>(`${this.url}/GetLimitForConstraint/${this.employee_service.employee.business_id}/${this.employee_service.employee.role_id}`)
  }
  //פונקציה לשליפת אילוץ ע"י קוד
  public GetOneById(s_id: number, e_id: string): Observable<Constraint> {
    return this.http.get<Constraint>(this.url + "GetConstraintById/" + s_id + "/" + e_id)
  }
  //פונקציה להוספת אילוץ
  public Add(): Observable<Array<Constraint>> {
    this.c.employee_id = this.employee_service.employee.id
    return this.http.put<Array<Constraint>>(this.url + "AddConstraint", this.c)
  }
  //פונקציה לעדכון אילוץ
  public Update(): Observable<Array<Constraint>> {
    return this.http.post<Array<Constraint>>(this.url + "UpdateConstraint", this.c)
  }
  //פונקציה למחיקת אילוץ
  public Delete(s_id: number, day: string): Observable<Array<Constraint>> {
    return this.http.delete<Array<Constraint>>(`${this.url}DeleteConstraint/${s_id}/${day}/${this.employee_service.employee.id}`)
  }
}
