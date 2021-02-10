import { TestBed } from '@angular/core/testing';

import { ShiftsEmployeesService } from './shifts-employees.service';

describe('ShiftsEmployeesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShiftsEmployeesService = TestBed.get(ShiftsEmployeesService);
    expect(service).toBeTruthy();
  });
});
