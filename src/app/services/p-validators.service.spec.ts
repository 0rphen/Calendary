import { TestBed } from '@angular/core/testing';

import { PValidatorsService } from './p-validators.service';

describe('PValidatorsService', () => {
  let service: PValidatorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PValidatorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be call the service', () => {
    expect(service.overTime('from', 'init')).toBeTruthy();
  })
});
