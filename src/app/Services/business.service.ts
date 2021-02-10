import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../Classes/Business';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  business:Business = new Business()
  sec_password:string
  url:string = "http://localhost:50744/api/Business/"
  constructor(private http:HttpClient) { }
  //פונקציה לשליפת רשימת עסקים
  public GetAll(): Observable<Array<Business>>
  {
    return this.http.get<Array<Business>>(this.url + "GetAllBusinesses")
  }
  //פונקציה לשליפת עסק ע"י קוד
  public GetOneById(id:number): Observable<Business>
  {
    return this.http.get<Business>(this.url+"GetBusinessById/" + id)
  }
  //פונקציה להוספת עסק
  public Add():Observable<Array<Business>>
  {
    this.business.id = 0
    debugger
    return this.http.put<Array<Business>>(this.url+"AddBusiness", this.business)
  }
  //פונקציה לעדכון עסק
  public Update():Observable<Array<Business>>
  {
    return this.http.post<Array<Business>>(this.url + "UpdateBusiness", this.business)
  }
  //פונקציה למחיקת עסק
  public Delete(id:number) : Observable<Array<Business>>
  {
    return this.http.delete<Array<Business>>(this.url + "DeleteBusiness/" + id)
  }
}
