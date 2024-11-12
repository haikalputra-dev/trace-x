import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IjpAreaOc3Component } from './ijp-area-oc3.component';

describe('IjpAreaOc3Component', () => {
  let component: IjpAreaOc3Component;
  let fixture: ComponentFixture<IjpAreaOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IjpAreaOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IjpAreaOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
