import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponAddonsComponent } from './weapon-addons.component';

describe('WeaponAddonsComponent', () => {
  let component: WeaponAddonsComponent;
  let fixture: ComponentFixture<WeaponAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponAddonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
