import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment as env } from 'src/environments/environment';
import { AccountType, Employee, Grade, TranHistory, TransferResponse } from './models';



@Injectable({
  providedIn: 'root'
})
export class RestService {

  header = {headers : new HttpHeaders({ 'Content-Type': 'application/json' })};

  constructor(private http: HttpClient) { }


  getBasicSalary(): Observable<number> {
    return this.http.get<number>(`${env.BASE_URL}/employee/salary-amount`, this.header);
  }

  setBasicSalary(amount: number): Observable<number> {
    const params = new HttpParams()
            .set('amount', amount.toString());
    return this.http.put<number>(`${env.BASE_URL}/employee/salary`, this.header, { params: params});
  }

  getCompanyBalance(): Observable<number> {
    return this.http.get<number>(`${env.BASE_URL}/company/account-balance`, this.header);
  }

  setCompanyBalance(amount: number): Observable<number> {
    const params = new HttpParams()
            .set('amount', amount.toString());
    return this.http.put<number>(`${env.BASE_URL}/company/account`, this.header, { params: params});
  }

  getGradeList():Observable<Grade[]>{
    return this.http.get<Grade[]>(`${env.BASE_URL}/employee/grades`, this.header)
  }

  getTypeList():Observable<AccountType[]>{
    return this.http.get<AccountType[]>(`${env.BASE_URL}/employee/types`, this.header)
  }

  getEmployeeList():Observable<Employee[]>{
    return this.http.get<Employee[]>(`${env.BASE_URL}/employee/get-all`, this.header);
  }

  insertEmployee(employee: Employee): Observable<Employee>{
    return this.http.post<Employee>(`${env.BASE_URL}/employee/save`, employee, this.header);
  }

  transferSalary(id: number):Observable<TransferResponse>{
    return this.http.put<TransferResponse>(`${env.BASE_URL}/employee/salary-transfer/${id}`, this.header);
  }

  transferSalaryToAll():Observable<TransferResponse>{
    return this.http.get<TransferResponse>(`${env.BASE_URL}/employee/salary-all`, this.header);
  }

  getCompanyTranHistory(): Observable<TranHistory>{
    return this.http.get<TranHistory>(`${env.BASE_URL}/employee/info`, this.header);
  }

}
