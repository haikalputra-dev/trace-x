import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InspectionResultCameraComponent } from './inspection-result-camera.component';

describe('InspectionResultCameraComponent', () => {
  let component: InspectionResultCameraComponent;
  let fixture: ComponentFixture<InspectionResultCameraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InspectionResultCameraComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InspectionResultCameraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
