import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeaponslistModalComponent } from './weaponslist-modal.component';

describe('WeaponslistModalComponent', () => {
  let component: WeaponslistModalComponent;
  let fixture: ComponentFixture<WeaponslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeaponslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeaponslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
