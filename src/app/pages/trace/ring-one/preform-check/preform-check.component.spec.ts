import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreformCheckComponent } from './preform-check.component';

describe('PreformCheckComponent', () => {
  let component: PreformCheckComponent;
  let fixture: ComponentFixture<PreformCheckComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreformCheckComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreformCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
