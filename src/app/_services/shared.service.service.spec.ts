import { TestBed } from '@angular/core/testing';

import { SharedServiceService } from './shared.break.service';

describe('SharedServiceService', () => {
  let service: SharedServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
