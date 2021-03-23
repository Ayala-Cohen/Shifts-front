import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Employee } from '../Classes/Employee';
import { BusinessService } from './business.service';
import { Ward } from '../Classes/Ward';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  employee: Employee = new Employee()
  is_director: boolean = false
  list_employees: Array<Employee> = new Array<Employee>();
  email: string
  sec_password: string
  formData: FormData = new FormData();
  url: string = "http://localhost:50744/api/Employees/"
  constructor(private http: HttpClient, private business_service: BusinessService) { }
  // 
  //פונקציה לשליפת רשימת עובדים
  public GetAll(): Observable<Array<Employee>> {
    return this.http.get<Array<Employee>>(this.url + "GetAllEmployees/" + this.business_service.business.id)
  }
  //פונקציה לשליפת עובד ע"י קוד
  public GetOneById(id: string): Observable<Employee> {
    return this.http.get<Employee>(this.url + "GetEmployeeById/" + id)
  }
  //פונקציה לשליפת מחלקות העובד
  public getDepartments(id: string): Observable<Array<Ward>> {
    return this.http.get<Array<Ward>>(`${this.url}GetDepartmentsForEmployee/${id}`)
  }
  //פונקציה להוספת מחלקות לעובד
  public AddDepartments(list_dep: Array<Ward>): Observable<void> {
    return this.http.post<void>(`${this.url}AddDepartmentsForEmployee/${this.employee.id}`, list_dep)
  }

  //פונקציה להוספת עובד
  public Add(): Observable<Array<Employee>> {
    this.employee.business_id = this.business_service.business.id
    this.employee.password = "123456"
    return this.http.put<Array<Employee>>(this.url + "AddEmployee", this.employee)
  }
  //פונקציה לעדכון עובד
  public Update(): Observable<Array<Employee>> {
    return this.http.post<Array<Employee>>(this.url + "UpdateEmployee", this.employee)
  }
  //פונקציה למחיקת עובד
  public Delete(id: string): Observable<Array<Employee>> {
    return this.http.delete<Array<Employee>>(this.url + "DeleteEmployee/" + id)
  }
  //פונקציה לבדיקת פרטי עובד ע"י שם משתמש וסיסמה
  public CheckEmployee(): Observable<Employee> {

    return this.http.get<Employee>(`${this.url}/CheckEmployee/${this.employee.email}/${this.employee.password}`)
  }
  //הוספת עובדים על ידי קריאה מקובץ אקסל
  public ImportFromExcel(): Observable<Array<Employee>> {
    return this.http.post<Array<Employee>>(`${this.url}ImportFromExcel/${this.business_service.business.id}`, this.formData)
  }
  //שליפת עובד לפי כתובת הדוא"ל שלו
  public getEmployeeByEmail(): Observable<Employee> {
    return this.http.get<Employee>(`${this.url}/GetEmployeeByEmail/${this.email}`)
  }
  //פונקציה למציאת פרטי עסק על פי פרטי עובד
  public getBusinessByEmployee(business_id: number) {
    this.business_service.GetOneById(business_id).subscribe(data =>
      this.business_service.business = data)
  }
}
