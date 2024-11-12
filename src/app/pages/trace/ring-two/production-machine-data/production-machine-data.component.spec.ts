import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataComponent } from './production-machine-data.component';

describe('ProductionMachineDataComponent', () => {
  let component: ProductionMachineDataComponent;
  let fixture: ComponentFixture<ProductionMachineDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
