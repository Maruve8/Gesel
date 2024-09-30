import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterEntrevistaListComponent } from './recruiter-entrevista-list.component';

describe('RecruiterEntrevistaListComponent', () => {
  let component: RecruiterEntrevistaListComponent;
  let fixture: ComponentFixture<RecruiterEntrevistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterEntrevistaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterEntrevistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
