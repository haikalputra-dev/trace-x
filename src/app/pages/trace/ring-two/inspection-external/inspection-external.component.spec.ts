import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionExternalComponent } from './inspection-external.component';

describe('InspectionExternalComponent', () => {
  let component: InspectionExternalComponent;
  let fixture: ComponentFixture<InspectionExternalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionExternalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionExternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
