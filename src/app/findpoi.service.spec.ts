import { TestBed } from '@angular/core/testing';

import { FindpoiService } from './findpoi.service';

describe('FindpoiService', () => {
  let service: FindpoiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FindpoiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
