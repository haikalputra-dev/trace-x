import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CapAreaOc3Component } from './cap-area-oc3.component';

describe('CapAreaOc3Component', () => {
  let component: CapAreaOc3Component;
  let fixture: ComponentFixture<CapAreaOc3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CapAreaOc3Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CapAreaOc3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
