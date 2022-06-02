import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponAddonslistComponent } from './weapon-addonslist.component';

describe('WeaponAddonslistComponent', () => {
  let component: WeaponAddonslistComponent;
  let fixture: ComponentFixture<WeaponAddonslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponAddonslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponAddonslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
