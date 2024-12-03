import { TestBed } from '@angular/core/testing';

import { FinduserService } from './finduser.service';

describe('FinduserService', () => {
  let service: FinduserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinduserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
