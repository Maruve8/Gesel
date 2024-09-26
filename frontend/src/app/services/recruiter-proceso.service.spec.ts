import { TestBed } from '@angular/core/testing';

import { RecruiterProcesoService } from './recruiter-proceso.service';

describe('RecruiterProcesoService', () => {
  let service: RecruiterProcesoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterProcesoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
