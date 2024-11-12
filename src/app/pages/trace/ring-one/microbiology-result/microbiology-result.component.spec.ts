import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrobiologyResultComponent } from './microbiology-result.component';

describe('MicrobiologyResultComponent', () => {
  let component: MicrobiologyResultComponent;
  let fixture: ComponentFixture<MicrobiologyResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MicrobiologyResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MicrobiologyResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
