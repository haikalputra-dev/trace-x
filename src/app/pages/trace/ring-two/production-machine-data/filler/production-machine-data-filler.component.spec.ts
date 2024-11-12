import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataFillerComponent } from './production-machine-data-filler.component';

describe('ProductionMachineDataFillerComponent', () => {
  let component: ProductionMachineDataFillerComponent;
  let fixture: ComponentFixture<ProductionMachineDataFillerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataFillerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataFillerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
