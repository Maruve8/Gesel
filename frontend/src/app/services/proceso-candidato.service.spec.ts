import { TestBed } from '@angular/core/testing';

import { ProcesoCandidatoService } from './proceso-candidato.service';

describe('ProcesoCandidatoService', () => {
  let service: ProcesoCandidatoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProcesoCandidatoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
