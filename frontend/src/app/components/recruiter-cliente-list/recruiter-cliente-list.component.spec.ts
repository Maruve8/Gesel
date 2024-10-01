import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecruiterClienteListComponent } from './recruiter-cliente-list.component';

describe('RecruiterClienteListComponent', () => {
  let component: RecruiterClienteListComponent;
  let fixture: ComponentFixture<RecruiterClienteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecruiterClienteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecruiterClienteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
