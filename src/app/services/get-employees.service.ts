import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EmployeeResponse } from 'src/types/employee-response.interface';

@Injectable({
  providedIn: 'root'
})
export class GetEmployeesService {
  readonly url : string = 'assets/data/employee.json';
  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<EmployeeResponse> {
    return this.httpClient.get<EmployeeResponse>(this.url);
  }
}
