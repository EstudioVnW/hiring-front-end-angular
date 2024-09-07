import { Component, OnInit } from '@angular/core';
import { GetEmployeesService } from 'src/app/services/get-employees.service';
import { EmployeeResponse } from 'src/types/employee-response.interface';
import { Employee } from 'src/types/employee.interface';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  results: Employee[] = [];
  filteredEmployees: Employee[] = [];
  searchTerm: string = '';
  isDialogVisible: boolean = false;

  constructor(private employeeService: GetEmployeesService) {}

  openDialog() {
    this.isDialogVisible = true;
  }

  onDialogClose() {
    this.isDialogVisible = false;
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((response: EmployeeResponse)=> {
      this.results = response.data; 
      this.filteredEmployees = this.results;
    });  
  }

  filterData(): void {
    if (!this.searchTerm) {
      this.filteredEmployees = this.results;
    } else {
      const searchTermLower = this.searchTerm.toLowerCase();
      this.filteredEmployees = this.results.filter(employee =>
        employee.name.toLowerCase().includes(searchTermLower) ||
        employee.email.toLowerCase().includes(searchTermLower) ||
        employee.phone.toLowerCase().includes(searchTermLower)
      );
    }
  }

  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }
}
