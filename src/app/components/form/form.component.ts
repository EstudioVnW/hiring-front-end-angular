import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GetEmployeesService } from 'src/app/services/get-employees.service';
import { EmployeeResponse } from 'src/types/employee-response.interface';
import { Employee } from 'src/types/employee.interface';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  employeeForm: FormGroup;
  departments: string[] = [];
  roles: string[] = [];

  isDialogVisible = false;
  @Output() closeDialog = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private employeeService: GetEmployeesService) {

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      dateJoined: ['', Validators.required]
    });
  }

 
  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((response: EmployeeResponse)=> {
      const employees = response.data; 
      this.departments = [...new Set(employees.map(employee => employee.department))]
      this.roles = [...new Set(employees.map(employee => employee.role))]  // Remove duplicates
    });

  }
  
  onSubmit() {
    if (this.employeeForm.valid) {
      console.log('Form Data: ', this.employeeForm.value);
      console.log('Formulário validado');
    } else {
      console.log('Formulário inválido');
    }
  }
}
