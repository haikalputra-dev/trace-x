import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineUtilityComponent } from './production-machine-utility.component';

describe('ProductionMachineUtilityComponent', () => {
  let component: ProductionMachineUtilityComponent;
  let fixture: ComponentFixture<ProductionMachineUtilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineUtilityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineUtilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
