import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Business } from '../Classes/Business';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BusinessService {
  business: Business = new Business()
  list_business: Array<Business> = new Array<Business>()
  sec_password: string
  director_email: string
  director_name: string
  // logo: Blob
  // logo_url
  url: string = "http://localhost:50744/api/Business/"
  constructor(private http: HttpClient) {
  }
  //פונקציה לשליפת רשימת עסקים
  public GetAll(): Observable<Array<Business>> {
    return this.http.get<Array<Business>>(this.url + "GetAllBusinesses")
  }
  //פונקציה לשליפת עסק ע"י קוד
  public GetOneById(id: number): Observable<Business> {
    return this.http.get<Business>(this.url + "GetBusinessById/" + id)
  }
  //פונקציה להוספת עסק
  public Add(): Observable<Array<Business>> {
    this.business.id = 0
    return this.http.put<Array<Business>>(this.url + "AddBusiness", this.business)
  }
  //פונקציה לעדכון עסק
  public Update(): Observable<Array<Business>> {
    return this.http.post<Array<Business>>(this.url + "UpdateBusiness", this.business)
  }
  //פונקציה למחיקת עסק
  public Delete(id: number): Observable<Array<Business>> {
    return this.http.delete<Array<Business>>(this.url + "DeleteBusiness/" + id)
  }
  //פונקציה לשליפת עסק ע"י פרטי מנהל
  public getBusinessBydirectorDetails(email: string, password: string): Observable<Business> {
    return this.http.get<Business>(this.url + "GetBusinessBydirectorDetails/" + email + "/" + password)
  }
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  getLogoAsImage(business: Business) {
    let reader = new FileReader();
    let buffer = new Uint8Array(business.logo)
    let x = buffer[0];
    let blob = new Blob([buffer], { type: 'image/png'  })
    reader.readAsDataURL(blob)
    this.delay(1000).then().catch(()=>
      console.log("error of waiting"))
    let res = reader.result as String
    return res
  }
}

