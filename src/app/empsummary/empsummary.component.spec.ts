import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpsummaryComponent } from './empsummary.component';

describe('EmpsummaryComponent', () => {
  let component: EmpsummaryComponent;
  let fixture: ComponentFixture<EmpsummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpsummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
