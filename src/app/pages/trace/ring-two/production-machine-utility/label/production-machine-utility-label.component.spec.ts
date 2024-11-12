import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityLabelComponent } from './production-machine-utility-label.component';

describe('ProductionMachineUtilityLabelComponent', () => {
  let component: ProductionMachineUtilityLabelComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityLabelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
