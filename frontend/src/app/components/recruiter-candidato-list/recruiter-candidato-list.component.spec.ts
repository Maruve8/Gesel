import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterCandidatoListComponent } from './recruiter-candidato-list.component';

describe('RecruiterCandidatoListComponent', () => {
  let component: RecruiterCandidatoListComponent;
  let fixture: ComponentFixture<RecruiterCandidatoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterCandidatoListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterCandidatoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
