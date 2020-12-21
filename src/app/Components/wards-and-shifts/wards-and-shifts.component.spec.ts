import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WardsAndShiftsComponent } from './wards-and-shifts.component';

describe('WardsAndShiftsComponent', () => {
  let component: WardsAndShiftsComponent;
  let fixture: ComponentFixture<WardsAndShiftsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WardsAndShiftsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WardsAndShiftsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
