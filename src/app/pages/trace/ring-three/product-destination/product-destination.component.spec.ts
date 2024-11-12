import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDestinationComponent } from './product-destination.component';

describe('ProductDestinationComponent', () => {
  let component: ProductDestinationComponent;
  let fixture: ComponentFixture<ProductDestinationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductDestinationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductDestinationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
