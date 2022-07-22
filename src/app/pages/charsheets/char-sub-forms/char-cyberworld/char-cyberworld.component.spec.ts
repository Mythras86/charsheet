import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharCyberworldComponent } from './char-cyberworld.component';

describe('CharCyberworldComponent', () => {
  let component: CharCyberworldComponent;
  let fixture: ComponentFixture<CharCyberworldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharCyberworldComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharCyberworldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
