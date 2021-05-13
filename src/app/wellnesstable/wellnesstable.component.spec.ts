import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WellnesstableComponent } from './wellnesstable.component';

describe('WellnesstableComponent', () => {
  let component: WellnesstableComponent;
  let fixture: ComponentFixture<WellnesstableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WellnesstableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WellnesstableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
