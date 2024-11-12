import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityCaserComponent } from './production-machine-utility-caser.component';

describe('ProductionMachineUtilityCaserComponent', () => {
  let component: ProductionMachineUtilityCaserComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityCaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityCaserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityCaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
