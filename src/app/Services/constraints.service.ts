import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constraint } from '../Classes/Constraint';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConstraintsService {
  url:string = "http://localhost:50744/api/Constraints/"
  constructor(private http : HttpClient) { }
    //פונקציה לשליפת רשימת אילוצים
    public GetAll(): Observable<Array<Constraint>>
    {
      return this.http.get<Array<Constraint>>(this.url + "GetAllConstraints")
    }
    //פונקציה לשליפת אילוץ ע"י קוד
    public GetOneById(s_id:number, e_id:string): Observable<Constraint>
    {
      return this.http.get<Constraint>(this.url+"GetConstraintById/"+s_id+"/"+e_id)
    }
    //פונקציה להוספת אילוץ
    public Add(c:Constraint):Observable<Array<Constraint>>
    {
      return this.http.put<Array<Constraint>>(this.url+"AddConstraint", c)
    }
    //פונקציה לעדכון אילוץ
    public Update(c:Constraint):Observable<Array<Constraint>>
    {
      return this.http.post<Array<Constraint>>(this.url + "UpdateConstraint", c)
    }
    //פונקציה למחיקת אילוץ
    public Delete(s_id:number, e_id:string) : Observable<Array<Constraint>>
    {
      return this.http.delete<Array<Constraint>>(this.url + "DeleteConstraint/" + s_id+"/"+e_id)
    }
}
