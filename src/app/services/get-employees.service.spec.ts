import { TestBed } from '@angular/core/testing';

import { GetEmployeesService } from './get-employees.service';

describe('GetEmployeesService', () => {
  let service: GetEmployeesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetEmployeesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
