import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagingMaterialComponent } from './packaging-material.component';

describe('PackagingMaterialComponent', () => {
  let component: PackagingMaterialComponent;
  let fixture: ComponentFixture<PackagingMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PackagingMaterialComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PackagingMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
