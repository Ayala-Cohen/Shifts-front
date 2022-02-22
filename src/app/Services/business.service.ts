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
  logo_url:string
  formData: FormData = new FormData();
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
    return this.http.put<Array<Business>>(this.url + "AddBusiness",this.business)
  }
  public saveLogo():Observable<string>{
    return this.http.post<string>(`${this.url}/saveLogo/${this.business.id}`, this.formData)
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
  checkIfCorrect(id: string) {
    let sum = 0
    if (id != undefined)
      if (id.length == 9) {
        for (let i = 0; i < 9; i++) {
          if (((i + 1) % 2)) {
            sum += Number(id[i])
          }
          else {
            let num = Number(id[i]) * 2
            if (num >= 10)
              sum += (num % 10 + (num - (num % 10)) / 10)
            else
              sum += num
          }
        }
      }
    return sum % 10
  }
}

