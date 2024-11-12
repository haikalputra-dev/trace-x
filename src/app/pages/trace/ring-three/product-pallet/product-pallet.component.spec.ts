import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPalletComponent } from './product-pallet.component';

describe('ProductPalletComponent', () => {
  let component: ProductPalletComponent;
  let fixture: ComponentFixture<ProductPalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPalletComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductPalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
