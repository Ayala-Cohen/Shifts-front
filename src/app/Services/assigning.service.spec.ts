import { TestBed } from '@angular/core/testing';

import { AssigningService } from './assigning.service';

describe('AssigningService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AssigningService = TestBed.get(AssigningService);
    expect(service).toBeTruthy();
  });
});
