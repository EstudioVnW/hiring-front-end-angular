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
  selectedDepartment: string = '';
  selectedRole: string = '';
  isDialogVisible: boolean = false;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  roles: string[] = [];
  departments: string[] = [];
  sortField: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  selectedEmployeeId: string | null = null;
  isModalVisible: boolean = false;
  employeeToEdit: Employee | null = null;
  selectedEmployee: Employee | null = null;
  isFormOpen = false;

  constructor(private employeeService: GetEmployeesService) { }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((response: EmployeeResponse) => {
      this.results = response.data;
      this.filteredEmployees = [...this.results];
      this.extractDepartmentsAndRoles();
      this.currentPage = 1;
    });
  }

  
  loadEmployees(): void {
    this.employeeService.getAllEmployees().subscribe((response: EmployeeResponse) => {
      this.results = response.data;
      this.filteredEmployees = [...this.results];
      this.extractDepartmentsAndRoles();
    });
  }

  
  openFormForNewEmployee(): void {
    this.selectedEmployee = null;
    this.isFormOpen = true;
    this.isDialogVisible = true;
  }

 
  openFormForEdit(employee: Employee): void {
    this.selectedEmployee = employee;
    this.isFormOpen = true;
    this.isDialogVisible = true;
  }


  closeForm(): void {
    this.isFormOpen = false;
    this.selectedEmployee = null;  
  }

 
  refreshEmployeeList(): void {
    this.loadEmployees();
    this.closeForm();  
  }

  onEmployeeAdded(newEmployee: Employee): void {
    this.results.push(newEmployee);
    this.filteredEmployees = [...this.results];
    this.extractDepartmentsAndRoles();
    this.filterData();
  }

  extractDepartmentsAndRoles(): void {
    this.departments = Array.from(new Set(this.results.map(employee => employee.department)));
    this.roles = Array.from(new Set(this.results.map(employee => employee.role)));
  }

  
  filterData(): void {
    let filtered = [...this.results];

    if (this.searchTerm) {
      const searchTermLower = this.searchTerm.toLowerCase();
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchTermLower) ||
        employee.email.toLowerCase().includes(searchTermLower) ||
        employee.phone.toLowerCase().includes(searchTermLower)
      );
    }

    if (this.selectedDepartment) {
      filtered = filtered.filter(employee =>
        employee.department === this.selectedDepartment
      );
    }

    if (this.selectedRole) {
      filtered = filtered.filter(employee =>
        employee.role === this.selectedRole
      );
    }

    if (this.sortField) {
      filtered.sort((a, b) => {
        const valueA = a[this.sortField as keyof Employee];
        const valueB = b[this.sortField as keyof Employee];
        const compare = valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        return this.sortDirection === 'asc' ? compare : -compare;
      });
    }

    this.filteredEmployees = filtered;
    this.currentPage = 1;
  }

  
  get paginatedEmployees(): Employee[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.filteredEmployees.slice(startIndex, endIndex);
  }

 
  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
  }

 
  changePage(page: number): void {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

 
  setSort(field: string): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.filterData();
  }

  
  trackByEmployeeId(index: number, employee: Employee): number {
    return employee.id;
  }

 
  onEdit(employeeId: string): void {
    const employee = this.results.find(emp => emp.id === +employeeId);
    if (employee) {
      this.employeeToEdit = employee;
      this.isDialogVisible = true;
    }
  }

  onDeleteRequest(employeeId: string): void {
    this.selectedEmployeeId = employeeId;
    this.isModalVisible = true;
  }

  confirmDelete(): void {
    if (this.selectedEmployeeId) {
      const employeeIdNumber = Number(this.selectedEmployeeId);
      this.results = this.results.filter(employee => employee.id !== employeeIdNumber);
      this.filteredEmployees = [...this.results];
      this.isModalVisible = false;
      this.selectedEmployeeId = null;
    }
  }

  closeModal(): void {
    this.isModalVisible = false;
    this.selectedEmployeeId = null;
  }

  
  onEmployeeUpdated(updatedEmployee: Employee): void {
    const index = this.results.findIndex(emp => emp.id === updatedEmployee.id);
    if (index !== -1) {
      this.results[index] = updatedEmployee;
    }
    this.filteredEmployees = [...this.results];
    this.extractDepartmentsAndRoles();
    this.filterData();
  }

  
  clearForm(): void {
    this.selectedEmployee = {} as Employee;
    this.isFormOpen = false;
    this.isDialogVisible = false;
  }

  
  onDialogClose(): void {
    this.isDialogVisible = false;
  }

  exportToCSV() {
    const visibleEmployees = this.paginatedEmployees; 
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Role', 'Date Joined'];
  
    
    const csvRows = visibleEmployees.map(employee => [
      employee.id,
      employee.name,
      employee.email,
      employee.phone,
      employee.department,
      employee.role,
      employee.dateJoined
    ]);
  
    
    const csvContent = [
      headers.join(','),  
      ...csvRows.map(row => row.join(','))  
    ].join('\n'); 
  
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
  
    
    const a = document.createElement('a');
    a.href = url;
    a.download = 'employees.csv';
    a.click();
  
    
    window.URL.revokeObjectURL(url);
  }
}
