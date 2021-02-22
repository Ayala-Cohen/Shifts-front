import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rating } from '../Classes/Rating';
import { EmployeesService } from './employees.service';

@Injectable({
  providedIn: 'root'
})
export class IntegrationService {
  color:string = "rgb(152, 200, 210)"
  url:string ="http://localhost:50744/api/Rating/"
  rating:Rating = new Rating();
  list_rating:Array<Rating> = new Array<Rating>();
  constructor(private http:HttpClient, private employee_service:EmployeesService) { }
    //פונקציה לשליפת רשימת דירוגים
    public GetAll(): Observable<Array<Rating>> {
      return this.http.get<Array<Rating>>(this.url + "GetAllRatings")
    }
    //פונקציה לשליפת דירוג ע"י קוד
    public GetOneById(id: number): Observable<Rating> {
      return this.http.get<Rating>(this.url + "GetRatingById/" + id)
    }
    //פונקציה להוספת דירוג
    public Add(shift_id:number): Observable<Array<Rating>> {
      this.rating.employee_id = this.employee_service.employee.id
      this.rating.shift_id = shift_id
      return this.http.put<Array<Rating>>(this.url + "AddRating", this.rating)
    }
    //פונקציה לעדכון דירוג
    public Update(): Observable<Array<Rating>> {
      return this.http.post<Array<Rating>>(this.url + "UpdateRating", this.rating)
    }
    //פונקציה למחיקת דירוג  
    //primary key in rating table is not correct
    public Delete(id: number): Observable<Array<Rating>> {
      return this.http.delete<Array<Rating>>(this.url + "DeleteRating/" + id)
    }
}
