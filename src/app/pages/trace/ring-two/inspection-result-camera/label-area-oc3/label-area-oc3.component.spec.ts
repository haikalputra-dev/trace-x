import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LabelAreaOc3Component } from './label-area-oc3.component';

describe('LabelAreaOc3Component', () => {
  let component: LabelAreaOc3Component;
  let fixture: ComponentFixture<LabelAreaOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LabelAreaOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LabelAreaOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
