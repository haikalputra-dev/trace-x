import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MachineDetailRingTwoComponent } from './machine-detail-ring-two.component';

describe('MachineDetailRingTwoComponent', () => {
  let component: MachineDetailRingTwoComponent;
  let fixture: ComponentFixture<MachineDetailRingTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MachineDetailRingTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MachineDetailRingTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
