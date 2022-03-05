import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharEquipmentComponent } from './char-equipment.component';

describe('CharEquipmentComponent', () => {
  let component: CharEquipmentComponent;
  let fixture: ComponentFixture<CharEquipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharEquipmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharEquipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
