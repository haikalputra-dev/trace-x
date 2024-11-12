import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtraceComponent } from './protrace.component';

describe('ProtraceComponent', () => {
  let component: ProtraceComponent;
  let fixture: ComponentFixture<ProtraceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProtraceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProtraceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
