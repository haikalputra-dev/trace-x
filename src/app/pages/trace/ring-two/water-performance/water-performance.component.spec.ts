import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaterPerformanceComponent } from './water-performance.component';

describe('WaterPerformanceComponent', () => {
  let component: WaterPerformanceComponent;
  let fixture: ComponentFixture<WaterPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WaterPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WaterPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
