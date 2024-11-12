import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityCaperComponent } from './production-machine-utility-caper.component';

describe('ProductionMachineUtilityCaperComponent', () => {
  let component: ProductionMachineUtilityCaperComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityCaperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityCaperComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityCaperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
