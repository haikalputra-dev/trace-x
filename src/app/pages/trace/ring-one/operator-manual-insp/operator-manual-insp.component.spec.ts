import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperatorManualInspComponent } from './operator-manual-insp.component';

describe('OperatorManualInspComponent', () => {
  let component: OperatorManualInspComponent;
  let fixture: ComponentFixture<OperatorManualInspComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OperatorManualInspComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperatorManualInspComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
