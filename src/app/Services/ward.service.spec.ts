import { TestBed } from '@angular/core/testing';

import { WardService } from './ward.service';

describe('WardService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WardService = TestBed.get(WardService);
    expect(service).toBeTruthy();
  });
});
