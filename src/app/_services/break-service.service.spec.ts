import { TestBed } from '@angular/core/testing';

import { BreakServiceService } from './break-service.service';

describe('BreakServiceService', () => {
  let service: BreakServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BreakServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
