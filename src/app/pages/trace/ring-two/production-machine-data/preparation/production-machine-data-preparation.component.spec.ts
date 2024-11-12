import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataPreparationComponent } from './production-machine-data-preparation.component';

describe('ProductionMachineDataPreparationComponent', () => {
  let component: ProductionMachineDataPreparationComponent;
  let fixture: ComponentFixture<ProductionMachineDataPreparationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataPreparationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataPreparationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
