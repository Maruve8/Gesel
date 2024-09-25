import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaFormComponent } from './entrevista-form.component';

describe('EntrevistaFormComponent', () => {
  let component: EntrevistaFormComponent;
  let fixture: ComponentFixture<EntrevistaFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrevistaFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistaFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
