import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRingOneComponent } from './detail-ring-one.component';

describe('DetailRingOneComponent', () => {
  let component: DetailRingOneComponent;
  let fixture: ComponentFixture<DetailRingOneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRingOneComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRingOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
