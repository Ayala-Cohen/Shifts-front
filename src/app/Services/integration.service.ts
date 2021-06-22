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
  toChange:boolean = true
  constructor(private http:HttpClient, private employee_service:EmployeesService) {
   }
    //פונקציה לשליפת רשימת דירוגים של עובד מסוים
    public GetAll(): Observable<Array<Rating>> {
      return this.http.get<Array<Rating>>(`${this.url}GetAllRatings/${this.employee_service.employee.id}`)
    }
    //פונקציה לשליפת דירוג ע"י קוד
    public GetOneById(e_id:string, shift_in_day: number): Observable<Rating> {
      return this.http.get<Rating>(`${this.url}GetRatingById/${e_id}/${shift_in_day}`)
    }
    //פונקציה להוספת דירוג
    public Add(shift_id:number, day:string): Observable<Array<Rating>> {
      this.rating.employee_id = this.employee_service.employee.id
      this.rating.shift_id = shift_id
      return this.http.put<Array<Rating>>(this.url + "AddRating/" +day, this.rating)
    }
    //פונקציה לעדכון דירוג
    public Update(): Observable<Array<Rating>> {
      return this.http.post<Array<Rating>>(this.url + "UpdateRating", this.rating)
    }
    //פונקציה למחיקת דירוג  
    public Delete(shift_in_day: number, e_id:string): Observable<Array<Rating>> {
      return this.http.delete<Array<Rating>>(`${this.url}DeleteRating/${e_id}/${shift_in_day}`)
    }
}
