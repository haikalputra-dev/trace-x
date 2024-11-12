import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataBlowComponent } from './production-machine-data-blow.component';

describe('ProductionMachineDataBlowComponent', () => {
  let component: ProductionMachineDataBlowComponent;
  let fixture: ComponentFixture<ProductionMachineDataBlowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataBlowComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataBlowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
