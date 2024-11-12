import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityLn2Component } from './production-machine-utility-ln2.component';

describe('ProductionMachineUtilityLn2Component', () => {
  let component: ProductionMachineUtilityLn2Component;
  let fixture: ComponentFixture<ProductionMachineUtilityLn2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityLn2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityLn2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
