import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRingTwoComponent } from './detail-ring-two.component';

describe('DetailRingTwoComponent', () => {
  let component: DetailRingTwoComponent;
  let fixture: ComponentFixture<DetailRingTwoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRingTwoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRingTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
