import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shift } from '../Classes/Shift';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  num_shifts: number
  list_shifts: Array<Shift> = new Array<Shift>()
  shift:Shift = new Shift()
  url: string = "http://localhost:50744/api/Shifts/"
  constructor(private http: HttpClient, private business_service: BusinessService) {
  }
  //פונקציה לשליפת רשימת משמרות
  public GetAll(): Observable<Array<Shift>> {
    return this.http.get<Array<Shift>>(this.url + "GetAllShifts/" + this.business_service.business.id)
  }
  //פונקציה לשליפת משמרת ע"י קוד
  public GetOneById(id: number): Observable<Shift> {
    return this.http.get<Shift>(this.url + "GetShiftById/" + id)
  }
  //פונקציה להוספת משמרת
  public Add(): Observable<Array<Shift>> {
    this.shift.business_id = this.business_service.business.id
    return this.http.put<Array<Shift>>(this.url + "AddShift", this.shift)
  }
  //פונקציה לעדכון משמרת
  public Update(): Observable<Array<Shift>> {
    return this.http.post<Array<Shift>>(this.url + "UpdateShift", this.shift)
  }
  //פונקציה למחיקת משמרת  
  public Delete(id: number): Observable<Array<Shift>> {
    return this.http.delete<Array<Shift>>(this.url + "DeleteShift/" + id)
  }

  public GetShiftForDay(shift_id:number, day:string):Observable<number>
  {
    return this.http.get<number>(`${this.url}/GetShiftInDayId/${shift_id}/${day}`)
  }
}
