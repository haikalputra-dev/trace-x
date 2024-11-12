import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityFillerComponent } from './production-machine-utility-filler.component';

describe('ProductionMachineUtilityFillerComponent', () => {
  let component: ProductionMachineUtilityFillerComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityFillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityFillerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
