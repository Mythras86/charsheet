import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorslistComponent } from './armorslist.component';

describe('ArmorslistComponent', () => {
  let component: ArmorslistComponent;
  let fixture: ComponentFixture<ArmorslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
