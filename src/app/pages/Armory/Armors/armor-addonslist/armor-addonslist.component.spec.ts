import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorAddonslistComponent } from './armor-addonslist.component';

describe('ArmorAddonslistComponent', () => {
  let component: ArmorAddonslistComponent;
  let fixture: ComponentFixture<ArmorAddonslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorAddonslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorAddonslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
