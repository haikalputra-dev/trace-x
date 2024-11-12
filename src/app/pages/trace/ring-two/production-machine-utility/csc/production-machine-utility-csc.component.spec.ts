import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityCscComponent } from './production-machine-utility-csc.component';

describe('ProductionMachineUtilityCscComponent', () => {
  let component: ProductionMachineUtilityCscComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityCscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityCscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityCscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
