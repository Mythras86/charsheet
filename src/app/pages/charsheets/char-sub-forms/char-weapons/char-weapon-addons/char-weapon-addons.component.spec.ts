import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharWeaponAddonsComponent } from './char-weapon-addons.component';

describe('CharWeaponAddonsComponent', () => {
  let component: CharWeaponAddonsComponent;
  let fixture: ComponentFixture<CharWeaponAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharWeaponAddonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharWeaponAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
