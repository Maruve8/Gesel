import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntrevistaListComponent } from './entrevista-list.component';

describe('EntrevistaListComponent', () => {
  let component: EntrevistaListComponent;
  let fixture: ComponentFixture<EntrevistaListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntrevistaListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EntrevistaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
