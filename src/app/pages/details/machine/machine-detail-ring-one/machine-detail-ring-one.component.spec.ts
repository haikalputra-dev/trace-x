import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailRingOneComponent } from './machine-detail-ring-one.component';

describe('MachineDetailRingOneComponent', () => {
  let component: MachineDetailRingOneComponent;
  let fixture: ComponentFixture<MachineDetailRingOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineDetailRingOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineDetailRingOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
