import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CandidatoDetalleComponent } from './candidato-detalle.component';

describe('CandidatoDetalleComponent', () => {
  let component: CandidatoDetalleComponent;
  let fixture: ComponentFixture<CandidatoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CandidatoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CandidatoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
