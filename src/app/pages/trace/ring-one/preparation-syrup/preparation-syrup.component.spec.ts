import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PreparationSyrupComponent } from './preparation-syrup.component';

describe('PreparationSyrupComponent', () => {
  let component: PreparationSyrupComponent;
  let fixture: ComponentFixture<PreparationSyrupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PreparationSyrupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PreparationSyrupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
