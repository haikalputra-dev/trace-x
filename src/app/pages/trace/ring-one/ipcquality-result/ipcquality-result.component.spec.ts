import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPCQualityResultComponent } from './ipcquality-result.component';

describe('IPCQualityResultComponent', () => {
  let component: IPCQualityResultComponent;
  let fixture: ComponentFixture<IPCQualityResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IPCQualityResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IPCQualityResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
