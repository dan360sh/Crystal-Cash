import { TestBed } from '@angular/core/testing';

import { ErrorParsService } from './error-pars.service';

describe('ErrorParsService', () => {
  let service: ErrorParsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ErrorParsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
