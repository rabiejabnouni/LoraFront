import { TestBed } from '@angular/core/testing';

import { SharedsendToUserService } from './sharedsend-to-user.service';

describe('SharedsendToUserService', () => {
  let service: SharedsendToUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedsendToUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
