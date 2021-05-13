import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentryComponent } from './dataentry.component';

describe('DataentryComponent', () => {
  let component: DataentryComponent;
  let fixture: ComponentFixture<DataentryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
