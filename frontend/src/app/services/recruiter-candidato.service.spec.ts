import { TestBed } from '@angular/core/testing';

import { RecruiterCandidatoService } from './recruiter-candidato.service';

describe('RecruiterCandidatoService', () => {
  let service: RecruiterCandidatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterCandidatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
