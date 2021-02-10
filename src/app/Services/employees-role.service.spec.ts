import { TestBed } from '@angular/core/testing';

import { EmployeesRoleService } from './employees-role.service';

describe('EmployeesRoleService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmployeesRoleService = TestBed.get(EmployeesRoleService);
    expect(service).toBeTruthy();
  });
});
