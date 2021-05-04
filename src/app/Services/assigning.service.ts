import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Assigning } from '../Classes/Assigning';
import { Employee } from '../Classes/Employee';
import { BusinessService } from './business.service';

@Injectable({
  providedIn: 'root'
})
export class AssigningService {
  url: string = "http://localhost:50744/api/Assigning/"
  list_assigning :Array<Assigning> = new Array<Assigning>();
  list_employee_high_rating:Map<number, Array<Employee>> = new Map<number,Array<Employee>>()
  constructor(private http:HttpClient, private business_service:BusinessService) { }

  public getAssigning():Observable<Array<Assigning>>
  {
    return this.http.get<Array<Assigning>>(`${this.url}/GetAssigning/${this.business_service.business.id}`)
  }

  public GetEmployeesWithHighRating(shift_id:number):Observable<Map<number,Array<Employee>>>
  {
    return this.http.get<Map<number,Array<Employee>>>(`${this.url}GetEmployeesWithHighRating/${this.business_service.business.id}/${shift_id}`)
  }
}
