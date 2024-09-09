import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Employee } from 'src/types/employee.interface';

@Injectable({
  providedIn: 'root'
})

export class CreateEmployeeService {
  readonly url : string = 'assets/data/employee.json';
  constructor(private http: HttpClient) { }
  createEmployee(employee: Employee): Observable<Employee> {
    return of(employee);
  }

  updateEmployee(employee: Employee): Observable<Employee> {
    return of (employee);
  }
}
