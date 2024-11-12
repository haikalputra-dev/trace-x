import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottleDimensionComponent } from './bottle-dimension.component';

describe('BottleDimensionComponent', () => {
  let component: BottleDimensionComponent;
  let fixture: ComponentFixture<BottleDimensionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BottleDimensionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottleDimensionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
