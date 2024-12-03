import { TestBed } from '@angular/core/testing';

import { CreatObjService } from './creat-obj.service';

describe('CreatObjService', () => {
  let service: CreatObjService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreatObjService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
