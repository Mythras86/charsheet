import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentslistModalComponent } from './equipmentslist-modal.component';

describe('EquipmentslistModalComponent', () => {
  let component: EquipmentslistModalComponent;
  let fixture: ComponentFixture<EquipmentslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
