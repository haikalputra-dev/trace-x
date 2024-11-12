import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataPackingComponent } from './production-machine-data-packing.component';

describe('ProductionMachineDataPackingComponent', () => {
  let component: ProductionMachineDataPackingComponent;
  let fixture: ComponentFixture<ProductionMachineDataPackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataPackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataPackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
