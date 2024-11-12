import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityInjectionComponent } from './production-machine-utility-injection.component';

describe('ProductionMachineUtilityInjectionComponent', () => {
  let component: ProductionMachineUtilityInjectionComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityInjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityInjectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
