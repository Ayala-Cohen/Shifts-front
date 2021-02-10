import { TestBed } from '@angular/core/testing';

import { ConstraintsService } from './constraints.service';

describe('ConstraintsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ConstraintsService = TestBed.get(ConstraintsService);
    expect(service).toBeTruthy();
  });
});
