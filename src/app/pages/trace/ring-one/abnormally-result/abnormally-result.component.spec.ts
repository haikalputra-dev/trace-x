import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbnormallyResultComponent } from './abnormally-result.component';

describe('AbnormallyResultComponent', () => {
  let component: AbnormallyResultComponent;
  let fixture: ComponentFixture<AbnormallyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AbnormallyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbnormallyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
