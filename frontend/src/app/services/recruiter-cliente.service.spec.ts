import { TestBed } from '@angular/core/testing';

import { RecruiterClienteService } from './recruiter-cliente.service';

describe('RecruiterClienteService', () => {
  let service: RecruiterClienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecruiterClienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
