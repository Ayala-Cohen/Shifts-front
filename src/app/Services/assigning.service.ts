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
  list_assigning: Array<Assigning> = new Array<Assigning>();
  list_employee_for_replacing: Map<number, Array<Employee>> = new Map<number, Array<Employee>>()
  current_employees_assigned_grouped_by_role:Map<number, Array<Employee>> = new Map<number, Array<Employee>>()

  constructor(private http: HttpClient, private business_service: BusinessService) { }

  public getAssigning(): Observable<Array<Assigning>> {
    return this.http.get<Array<Assigning>>(`${this.url}/GetAssigning/${this.business_service.business.id}`)
  }

  public GetEmployeesForReplacing(shift_id: number): Observable<Map<number, Array<Employee>>> {
    return this.http.get<Map<number, Array<Employee>>>(`${this.url}GetEmployeesForReplacing/${this.business_service.business.id}/${shift_id}`)
  }

  public ActivateAssigning(): Observable<Array<Assigning>> {
    return this.http.get<Array<Assigning>>(`${this.url}ActivateAssigning/${this.business_service.business.id}`)
  }

  public EditAssinging(assinging_for_editing:Assigning, employee_id_replacing:string):Observable<Array<Assigning>>{
    return this.http.post<Array<Assigning>>(`${this.url}/EditAssigning/${employee_id_replacing}`, assinging_for_editing)
  }

  public GetAssingingByRoles(shift_in_day_id:number, ward_id:number):Observable<Map<number, Array<Employee>>>
  {
    return this.http.get<Map<number, Array<Employee>>>(`${this.url}/GetAssingingByRoles/${shift_in_day_id}/${ward_id}`)
  }
}
