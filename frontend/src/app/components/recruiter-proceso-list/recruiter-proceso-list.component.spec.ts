import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterProcesoListComponent } from './recruiter-proceso-list.component';

describe('RecruiterProcesoListComponent', () => {
  let component: RecruiterProcesoListComponent;
  let fixture: ComponentFixture<RecruiterProcesoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterProcesoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterProcesoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
