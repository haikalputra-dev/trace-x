import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottlePressureComponent } from './bottle-pressure.component';

describe('BottlePressureComponent', () => {
  let component: BottlePressureComponent;
  let fixture: ComponentFixture<BottlePressureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottlePressureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottlePressureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
