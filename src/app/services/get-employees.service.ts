import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../../types/employee.interface';
@Injectable({
  providedIn: 'root'
})
export class GetEmployeesService {
  readonly url : string = 'assets/data/employee.json';
  constructor(private httpClient: HttpClient) { }

  getAllEmployees(): Observable<Employee> {
    return this.httpClient.get<Employee>(this.url);
  }
}
