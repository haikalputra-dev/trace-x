import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailRingThreeComponent } from './detail-ring-three.component';

describe('DetailRingThreeComponent', () => {
  let component: DetailRingThreeComponent;
  let fixture: ComponentFixture<DetailRingThreeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailRingThreeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailRingThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
