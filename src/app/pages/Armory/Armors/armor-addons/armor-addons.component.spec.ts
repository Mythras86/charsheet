import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorAddonsComponent } from './armor-addons.component';

describe('ArmorAddonsComponent', () => {
  let component: ArmorAddonsComponent;
  let fixture: ComponentFixture<ArmorAddonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorAddonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorAddonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
