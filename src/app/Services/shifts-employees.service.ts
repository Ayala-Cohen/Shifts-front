import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ShiftEmployees } from '../Classes/ShiftEmployee';

@Injectable({
  providedIn: 'root'
})
export class ShiftsEmployeesService {

  url: string = "http://localhost:50744/api/ShiftsEmployees/"
  constructor(private http: HttpClient) { }
  //פונקציה לשליפת רשימת עובדים ומשמרות
  public GetAll(): Observable<Array<ShiftEmployees>> {
    return this.http.get<Array<ShiftEmployees>>(this.url + "GetAllShiftsEmployees")
  }
  //פונקציה לשליפת רשומה מטבלת עובדים במשמרות ע"י קוד
  public GetOneById(id: number): Observable<ShiftEmployees> 
  {
    return this.http.get<ShiftEmployees>(this.url + "GetShiftsEmployeeById/" + id)
  }
  //פונקציה להוספת רשומה לטבלת עובדים ומשמרות
  public Add(s: ShiftEmployees): Observable<Array<ShiftEmployees>> 
  {
    return this.http.put<Array<ShiftEmployees>>(this.url + "AddShiftsEmployee", s)
  }
  //פונקציה לעדכון רשומה בטבלה עובדים ומשמרות
  public Update(s: ShiftEmployees): Observable<Array<ShiftEmployees>> 
  {
    return this.http.post<Array<ShiftEmployees>>(this.url + "UpdateShiftsEmployee", s)
  }
  //פונקציה למחיקת רשומה בטבלת עובדים ומשמרות
  public Delete(id: number): Observable<Array<ShiftEmployees>> 
  {
    return this.http.delete<Array<ShiftEmployees>>(this.url + "DeleteShiftsEmployee/"+ id)
  }
}
