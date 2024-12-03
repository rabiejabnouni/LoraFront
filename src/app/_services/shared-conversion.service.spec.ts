import { TestBed } from '@angular/core/testing';

import { SharedConversionService } from './shared-conversion.service';

describe('SharedConversionService', () => {
  let service: SharedConversionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SharedConversionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
