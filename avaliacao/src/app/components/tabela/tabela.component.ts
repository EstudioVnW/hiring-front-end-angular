import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { Data } from 'src/app/models/data';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import * as Papa from 'papaparse';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const CSV_TYPE = 'text/csv;charset=utf-8';

@Component({
  selector: 'app-tabela',
  templateUrl: './tabela.component.html',
  styleUrls: ['./tabela.component.sass']
})
export class TabelaComponent implements OnInit {
  data: Data[] = [];
  filteredData: Data[] = [];
  paginatedData: Data[] = [];
  searchQuery = '';
  filterByDepartment = '';
  filterByRole = '';
  currentPage = 1;
  pageSize = 5;
  totalPages = 1;
  departments: string[] = [];
  roles: string[] = [];
  newEntry: Data = {
    id: 0,
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    dateJoined: ''
  };

  sortField: keyof Data | null = null;
  sortDirection: 'asc' | 'desc' | '' = '';

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.dataService.getData().subscribe((response: Data[]) => {
      this.data = response.map(item => ({ ...item, isEditing: false }));
      this.filteredData = [...this.data];
      this.updatePagination();
      this.setDepartmentsAndRoles();
    });
  }

  setDepartmentsAndRoles(): void {
    this.departments = Array.from(new Set(this.data.map(item => item.department)));
    this.roles = Array.from(new Set(this.data.map(item => item.role)));
  }

  filterData(): void {
    this.filteredData = this.data.filter(item => 
      (item.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
      item.phone.includes(this.searchQuery)) &&
      (this.filterByDepartment ? item.department === this.filterByDepartment : true) &&
      (this.filterByRole ? item.role === this.filterByRole : true)
    );
    this.updatePagination();
  }

  sortData(field: keyof Data): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : this.sortDirection === 'desc' ? '' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }

    if (this.sortDirection === '') {
      this.filteredData = [...this.data];
    } else {
      this.filteredData.sort((a, b) => {
        const aValue = a[field] ?? '';
        const bValue = b[field] ?? '';

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return this.sortDirection === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return this.sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }
        return 0;
      });
    }
    this.updatePagination();
  }

  editEntry(item: Data): void {
    item.isEditing = true;
  }

  saveEntry(item: Data): void {
    item.isEditing = false;

    const localStorageData = JSON.parse(localStorage.getItem('data') || '[]');
    const index = localStorageData.findIndex((i: Data) => i.id === item.id);
    if (index !== -1) {
      localStorageData[index] = item;
      localStorage.setItem('data', JSON.stringify(localStorageData));
      this.data = localStorageData;
      this.filteredData = [...this.data];
      this.updatePagination();
    }
    this.setDepartmentsAndRoles();
  }

  deleteEntry(item: Data): void {
    if (confirm('Tem certeza de que deseja excluir este registro?')) {
      const localStorageData = JSON.parse(localStorage.getItem('data') || '[]');
      const updatedData = localStorageData.filter((i: Data) => i.id !== item.id);
      localStorage.setItem('data', JSON.stringify(updatedData));
      this.data = updatedData;
      this.filteredData = [...this.data];
      this.updatePagination();

      if (this.currentPage > this.totalPages) {
        this.currentPage = this.totalPages;
        this.updatePagination();
      }
      this.setDepartmentsAndRoles();
    }
  }

  addEntry(): void {
    if (!this.isEmailValid(this.newEntry.email)) {
      alert('Por favor, insira um e-mail válido.');
      return;
    }

    if (!this.isDateValid(this.newEntry.dateJoined)) {
      alert('A data de entrada deve conter apenas números.');
      return;
    }

    if (this.newEntry.name && this.newEntry.email && this.newEntry.phone && this.newEntry.department && this.newEntry.role && this.newEntry.dateJoined) {
      this.newEntry.id = this.data.length ? Math.max(...this.data.map(d => d.id)) + 1 : 1;
      this.data.push(this.newEntry);
      this.filteredData = [...this.data];
      this.updatePagination();

      localStorage.setItem('data', JSON.stringify(this.data));

      if (!this.departments.includes(this.newEntry.department)) {
        this.departments.push(this.newEntry.department);
      }
      if (!this.roles.includes(this.newEntry.role)) {
        this.roles.push(this.newEntry.role);
      }

      this.newEntry = {
        id: 0,
        name: '',
        email: '',
        phone: '',
        department: '',
        role: '',
        dateJoined: ''
      };
    } else {
      alert('Por favor, preencha todos os campos.');
    }
  }

  isEmailValid(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isDateValid(date: string): boolean {
    const dateRegex = /^\d+$/;
    return dateRegex.test(date);
  }

  exportToExcel(): void {
    const excelData: any[] = this.paginatedData.map(item => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Department: item.department,
      Role: item.role,
      DateJoined: item.dateJoined
    }));

    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(excelData);
    const workbook: XLSX.WorkBook = {
      Sheets: { 'data': worksheet },
      SheetNames: ['data']
    };

    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob: Blob = new Blob([excelBuffer], { type: EXCEL_TYPE });
    saveAs(blob, 'data.xlsx');
  }

  exportToCSV(): void {
    const csvData = this.paginatedData.map(item => ({
      Name: item.name,
      Email: item.email,
      Phone: item.phone,
      Department: item.department,
      Role: item.role,
      DateJoined: item.dateJoined
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: CSV_TYPE });
    saveAs(blob, 'data.csv');
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.filteredData.length / this.pageSize);
    this.paginatedData = this.filteredData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize);
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
