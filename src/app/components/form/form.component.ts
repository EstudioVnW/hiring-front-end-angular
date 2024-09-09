import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateEmployeeService } from 'src/app/services/create-employee.service';
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
  results: Employee[] = [];
  isDialogVisible = false;
  @Output() closeDialog = new EventEmitter<void>();
  @Output() employeeAdded = new EventEmitter<Employee>();
  @Input() employeeToEdit: Employee | null = null;
  @Output() save = new EventEmitter<Employee>();

  constructor(
    private fb: FormBuilder,
    private employeeService: GetEmployeesService,
    private createEmployeeService: CreateEmployeeService,
    private cdr: ChangeDetectorRef
  ) {

    this.employeeForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^\+?[\d\s\-]{10,15}$/)]],
      department: ['', Validators.required],
      role: ['', Validators.required],
      dateJoined: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/)]],
    });
  }

  ngOnInit(): void {
    this.employeeService.getAllEmployees().subscribe((response: EmployeeResponse) => {
      const employees = response.data;
      this.departments = [...new Set(employees.map(employee => employee.department))]
      this.roles = [...new Set(employees.map(employee => employee.role))]

      if (this.employeeToEdit) {
        
        this.employeeForm.patchValue(this.employeeToEdit);
      }
    });

  }

  onSubmit() {
    if (this.employeeForm.invalid) {
      this.employeeForm.markAllAsTouched();
      return;
    }
  
    if (this.employeeToEdit) {
      this.editEmployee();
    } else {
      this.createEmployee();
    }
  }
  
  
  createEmployee() {
    if (this.employeeForm.valid) {
      const newEmployee = { 
        id: this.results.length > 0 ? this.results[this.results.length - 1].id + 1 : 1,
        ...this.employeeForm.value 
      };
  
      this.createEmployeeService.createEmployee(newEmployee).subscribe(
        (response) => {
          console.log('Funcionário adicionado com sucesso:', response);
          this.cdr.detectChanges();
          this.employeeForm.reset();
          this.employeeAdded.emit(newEmployee);
          this.isDialogVisible = false;
          this.closeDialog.emit();
        },
        (error) => {
          console.error('Erro ao adicionar funcionário:', error);
        }
      );
    }
  }
  editEmployee() {
    const updatedEmployee = this.employeeForm.value;
    this.createEmployeeService.updateEmployee(updatedEmployee).subscribe(
      (response) => {
        console.log('Funcionário atualizado com sucesso:', response)
        this.employeeForm.reset();
        this.isDialogVisible = false;
        this.closeDialog.emit();
        this.save.emit(updatedEmployee);
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Erro ao atualizar funcionário:', error)
      }
    )
  }

}