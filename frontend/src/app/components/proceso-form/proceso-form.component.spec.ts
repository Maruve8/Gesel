import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcesoFormComponent } from './proceso-form.component';

describe('ProcesoFormComponent', () => {
  let component: ProcesoFormComponent;
  let fixture: ComponentFixture<ProcesoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProcesoFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProcesoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
