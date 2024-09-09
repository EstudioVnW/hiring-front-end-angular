import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.sass']
})
export class FiltrosComponent {
  @Output() searchQueryChanged = new EventEmitter<string>();
  @Output() filterByDepartmentChanged = new EventEmitter<string>();
  @Output() filterByRoleChanged = new EventEmitter<string>();

  searchQuery = '';
  filterByDepartment = '';
  filterByRole = '';

  departments: string[] = [];
  roles: string[] = [];

  onSearchChange(): void {
    this.searchQueryChanged.emit(this.searchQuery);
  }

  onDepartmentChange(): void {
    this.filterByDepartmentChanged.emit(this.filterByDepartment);
  }

  onRoleChange(): void {
    this.filterByRoleChanged.emit(this.filterByRole);
  }
}
