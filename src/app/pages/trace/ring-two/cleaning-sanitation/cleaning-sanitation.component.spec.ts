import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CleaningSanitationComponent } from './cleaning-sanitation.component';

describe('CleaningSanitationComponent', () => {
  let component: CleaningSanitationComponent;
  let fixture: ComponentFixture<CleaningSanitationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CleaningSanitationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CleaningSanitationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
