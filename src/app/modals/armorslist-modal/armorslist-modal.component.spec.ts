import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorslistModalComponent } from './armorslist-modal.component';

describe('ArmorslistModalComponent', () => {
  let component: ArmorslistModalComponent;
  let fixture: ComponentFixture<ArmorslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
