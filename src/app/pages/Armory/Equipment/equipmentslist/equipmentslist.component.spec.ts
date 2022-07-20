import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EquipmentslistComponent } from './equipmentslist.component';

describe('EquipmentslistComponent', () => {
  let component: EquipmentslistComponent;
  let fixture: ComponentFixture<EquipmentslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EquipmentslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EquipmentslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
