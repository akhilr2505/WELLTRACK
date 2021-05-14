import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnesssProgrammComponent } from './wellnesss-programm.component';

describe('WellnesssProgrammComponent', () => {
  let component: WellnesssProgrammComponent;
  let fixture: ComponentFixture<WellnesssProgrammComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellnesssProgrammComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnesssProgrammComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
