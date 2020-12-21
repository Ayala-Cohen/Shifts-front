import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorDetailsComponent } from './director-details.component';

describe('DirectorDetailsComponent', () => {
  let component: DirectorDetailsComponent;
  let fixture: ComponentFixture<DirectorDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectorDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
