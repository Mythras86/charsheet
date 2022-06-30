import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharArmorsComponent } from './char-armors.component';

describe('CharArmorsComponent', () => {
  let component: CharArmorsComponent;
  let fixture: ComponentFixture<CharArmorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharArmorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharArmorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
