import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CCPResultComponent } from './ccpresult.component';

describe('CCPResultComponent', () => {
  let component: CCPResultComponent;
  let fixture: ComponentFixture<CCPResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CCPResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CCPResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
