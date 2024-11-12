import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionMachineDataInjectionComponent } from './production-machine-data-injection.component';

describe('ProductionMachineDataInjectionComponent', () => {
  let component: ProductionMachineDataInjectionComponent;
  let fixture: ComponentFixture<ProductionMachineDataInjectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductionMachineDataInjectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductionMachineDataInjectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
