import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Shift } from '../Classes/Shift';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root'
})
export class ShiftsService {
  shift:Shift = new Shift()
  num_shifts: number 
  list_shifts: Array<Shift> = new Array<Shift>()
  url: string = "http://localhost:50744/api/Shifts/"
  constructor(private http: HttpClient,private business_service:BusinessService) {
    this.shift.business_id = business_service.business.id
   }
  //פונקציה לשליפת רשימת משמרות
  public GetAll(): Observable<Array<Shift>> {
    return this.http.get<Array<Shift>>(this.url + "GetAllShifts/"+this.business_service.business.id)
  }
  //פונקציה לשליפת משמרת ע"י קוד
  public GetOneById(id: number): Observable<Shift> 
  {
    return this.http.get<Shift>(this.url + "GetShiftById/" + id)
  }
  //פונקציה להוספת משמרת
  public Add(s: Shift): Observable<Array<Shift>> 
  {
    return this.http.put<Array<Shift>>(this.url + "AddShift", s)
  }
  //פונקציה לעדכון משמרת
  public Update(s: Shift): Observable<Array<Shift>> 
  {
    return this.http.post<Array<Shift>>(this.url + "UpdateShift", s)
  }
  //פונקציה למחיקת משמרת  
  public Delete(id: number): Observable<Array<Shift>> 
  {
    return this.http.delete<Array<Shift>>(this.url + "DeleteShift/"+ id)
  }

  init_list()
  {
    //הוספת ערכים לרשימת משמרות
      let difference = this.num_shifts - this.list_shifts.length
      for (let i = 0; i < difference; i++)
        this.list_shifts.push(new Shift(0,this.business_service.business.id,"" ))
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
