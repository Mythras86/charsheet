import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharWeaponsComponent } from './char-weapons.component';

describe('CharWeaponsComponent', () => {
  let component: CharWeaponsComponent;
  let fixture: ComponentFixture<CharWeaponsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharWeaponsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharWeaponsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
