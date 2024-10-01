import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoCandidatoListComponent } from './proceso-candidato-list.component';

describe('ProcesoCandidatoListComponent', () => {
  let component: ProcesoCandidatoListComponent;
  let fixture: ComponentFixture<ProcesoCandidatoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoCandidatoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoCandidatoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
