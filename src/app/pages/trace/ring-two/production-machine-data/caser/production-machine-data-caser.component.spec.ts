import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataCaserComponent } from './production-machine-data-caser.component';

describe('ProductionMachineDataCaserComponent', () => {
  let component: ProductionMachineDataCaserComponent;
  let fixture: ComponentFixture<ProductionMachineDataCaserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataCaserComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataCaserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
