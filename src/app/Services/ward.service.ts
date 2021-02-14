import { Injectable } from '@angular/core';
import { Ward } from '../Classes/Ward';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WardService {
  num_wards: number
  list_wards: Array<Ward> = new Array<Ward>()
  ward:Ward = new Ward()
  url: string = "http://localhost:50744/api/Departments/"
  constructor(private http: HttpClient) { }
  //פונקציה לשליפת רשימת מחלקות
  public GetAll(): Observable<Array<Ward>> {
    return this.http.get<Array<Ward>>(this.url + "GetAllDepartments")
  }
  //פונקציה לשליפת מחלקה ע"י קוד
  public GetOneById(id: number): Observable<Ward> 
  {
    return this.http.get<Ward>(this.url + "GetDepartmentById/" + id)
  }
  //פונקציה להוספת מחלקה
  public Add(): Observable<Array<Ward>> 
  {
    return this.http.put<Array<Ward>>(this.url + "AddDepartment", this.ward)
  }
  //פונקציה לעדכון מחלקה
  public Update(): Observable<Array<Ward>> 
  {
    return this.http.post<Array<Ward>>(this.url + "UpdateDepartment", this.ward)
  }
  //פונקציה למחיקת מחלקה  
  public Delete(id: number): Observable<Array<Ward>> 
  {
    return this.http.delete<Array<Ward>>(this.url + "DeleteDepartment/"+ id)
  }
  init_list() {
    let difference;
      //הוספת ערכים לרשימת מחלקות
      debugger
      difference = this.num_wards - this.list_wards.length
      for (let i = 0; i < difference; i++)
        this.list_wards.push(new Ward())
  }
  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
