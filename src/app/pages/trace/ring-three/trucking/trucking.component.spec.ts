import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TruckingComponent } from './trucking.component';

describe('TruckingComponent', () => {
  let component: TruckingComponent;
  let fixture: ComponentFixture<TruckingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TruckingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TruckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
