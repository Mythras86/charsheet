import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharNewWeaponComponent } from './char-new-weapon.component';

describe('CharNewWeaponComponent', () => {
  let component: CharNewWeaponComponent;
  let fixture: ComponentFixture<CharNewWeaponComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharNewWeaponComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharNewWeaponComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
