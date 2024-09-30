import { TestBed } from '@angular/core/testing';

import { RecruiterEntrevistaService } from './recruiter-entrevista.service';

describe('RecruiterEntrevistaService', () => {
  let service: RecruiterEntrevistaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterEntrevistaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
