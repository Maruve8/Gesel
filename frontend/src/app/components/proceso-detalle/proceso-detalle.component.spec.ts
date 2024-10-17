import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoDetalleComponent } from './proceso-detalle.component';

describe('ProcesoDetalleComponent', () => {
  let component: ProcesoDetalleComponent;
  let fixture: ComponentFixture<ProcesoDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
