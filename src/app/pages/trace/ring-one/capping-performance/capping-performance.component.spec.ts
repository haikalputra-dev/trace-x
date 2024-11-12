import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CappingPerformanceComponent } from './capping-performance.component';

describe('CappingPerformanceComponent', () => {
  let component: CappingPerformanceComponent;
  let fixture: ComponentFixture<CappingPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CappingPerformanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CappingPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
