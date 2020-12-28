import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinalIntegrationComponent } from './final-integration.component';

describe('FinalIntegrationComponent', () => {
  let component: FinalIntegrationComponent;
  let fixture: ComponentFixture<FinalIntegrationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinalIntegrationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinalIntegrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
