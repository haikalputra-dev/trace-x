import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityBlowComponent } from './production-machine-utility-blow.component';

describe('ProductionMachineUtilityBlowComponent', () => {
  let component: ProductionMachineUtilityBlowComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityBlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityBlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityBlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
