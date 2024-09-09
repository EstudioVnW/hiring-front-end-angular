import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'processoSeletivo';

  userToDelete: any = null;

  users: any[] = [];
  paginatedUsers: any[] = [];
  filteredUsers: any[] = [];

  selectedDepartment: string = '';
  selectedRole: string = '';
  availableDepartments: string[] = [];
  availableRoles: string[] = [];

  searchTerm: string = '';
  searchField: string = 'name';

  sortColumn: string = '';
  sortDirection: string = 'asc';

  newUser = {
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    dateJoined: ''
  };

  urlToJson = 'assets/exemploJson.json';

  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      this.users = JSON.parse(storedUsers);
      this.initializeFilters();
      this.applyFilters();
      this.setupPagination();
    } else {
      this.http.get<any>(this.urlToJson).subscribe((response) => {
        if (response && response.data && Array.isArray(response.data)) {
          this.users = response.data;
          this.saveUsersToLocalStorage();
          this.initializeFilters();
          this.applyFilters();
          this.setupPagination();
        } else {
          console.error('Estrutura de dados inválida no JSON.');
        }
      });
    }
  }

  saveUsersToLocalStorage(): void {
    localStorage.setItem('users', JSON.stringify(this.users));
  }





  initializeFilters(): void {
    this.availableDepartments = [...new Set(this.users.map(user => user.department))];
    this.availableRoles = [...new Set(this.users.map(user => user.role))];
  }

  applyFilters(): void {
    this.filteredUsers = this.users.filter(user => {
      const matchesDepartment = this.selectedDepartment === '' || user.department === this.selectedDepartment;
      const matchesRole = this.selectedRole === '' || user.role === this.selectedRole;

      const matchesSearchTerm = this.searchTerm === '' ||
        user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        user.phone.includes(this.searchTerm);

      return matchesDepartment && matchesRole && matchesSearchTerm;
    });

    this.sortUsers();
    this.paginateUsers();
  }


  sortUsers(): void {
    if (this.sortColumn) {
      this.filteredUsers.sort((a, b) => {
        const valueA = a[this.sortColumn];
        const valueB = b[this.sortColumn];

        if (this.sortDirection === 'asc') {
          return valueA > valueB ? 1 : valueA < valueB ? -1 : 0;
        } else {
          return valueA < valueB ? 1 : valueA > valueB ? -1 : 0;
        }
      });
    }
  }


  toggleSort(column: string): void {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  setupPagination(): void {
    this.totalPages = Math.ceil(this.filteredUsers.length / this.itemsPerPage);
    this.paginateUsers();
  }

  paginateUsers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.paginateUsers();
    }
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.paginateUsers();
    }
  }

  editUser(user: any): void {
    user.isEditing = !user.isEditing;

    if (!user.isEditing) {
      this.saveUsersToLocalStorage();
    }
  }

  addUser(): void {
    const missingFields = [];

    if (!this.newUser.name) missingFields.push('Name');
    if (!this.newUser.email) missingFields.push('Email');
    if (!this.newUser.phone) missingFields.push('Phone');
    if (!this.newUser.department) missingFields.push('Department');
    if (!this.newUser.role) missingFields.push('Role');
    if (!this.newUser.dateJoined) missingFields.push('Date Joined');

    if (missingFields.length > 0) {
      alert(`Please complete the following fields: ${missingFields.join(', ')}`);
      return;
    }

    const newId = Math.max(...this.users.map(user => user.id)) + 1;
    this.users.push({
      id: newId,
      ...this.newUser,
      isEditing: false
    });

    this.saveUsersToLocalStorage();
    this.initializeFilters();
    this.applyFilters();
    this.setupPagination();
    this.resetNewUser();
  }

  openDeleteModal(user: any) {
    this.userToDelete = user;
  }

  closeDeleteModal() {
    this.userToDelete = null;
  }

  deleteUserConfirmed() {
    const index = this.users.indexOf(this.userToDelete);
    if (index > -1) {
      this.users.splice(index, 1);
      this.saveUsersToLocalStorage();
      this.applyFilters();

      if (this.paginatedUsers.length === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      this.setupPagination();
    }
    this.closeDeleteModal();
  }


  deleteUser(user: any): void {
    const index = this.users.indexOf(user);
    if (index >= 0) {
      this.users.splice(index, 1);
      this.saveUsersToLocalStorage();
      this.initializeFilters();
      this.applyFilters();
      this.setupPagination();
    }
  }


  resetNewUser(): void {
    this.newUser = {
      name: '',
      email: '',
      phone: '',
      department: '',
      role: '',
      dateJoined: ''
    };
  }


  exportToCSV(): void {
    const headers = ['ID', 'Name', 'Email', 'Phone', 'Department', 'Role', 'Date Joined'];

    const rows = this.paginatedUsers.map(user => [
      user.id,
      user.name,
      user.email,
      user.phone,
      user.department,
      user.role,
      user.dateJoined
    ]);

    const csvContent = [headers, ...rows].map(e => e.join(",")).join("\n");

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = 'users-page-' + this.currentPage + '.csv';
    anchor.click();
    window.URL.revokeObjectURL(url);
  }

  exportToJSON(): void {
    const updatedData = JSON.stringify({ data: this.users }, null, 2);
    const blob = new Blob([updatedData], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'updated-exemploJson.json';
    a.click();

    window.URL.revokeObjectURL(url);
  }
}