import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityPreparationComponent } from './production-machine-utility-preparation.component';

describe('ProductionMachineUtilityPreparationComponent', () => {
  let component: ProductionMachineUtilityPreparationComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityPreparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
