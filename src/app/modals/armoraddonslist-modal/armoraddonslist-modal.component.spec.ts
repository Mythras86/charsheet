import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArmorAddonslistModalComponent } from './armoraddonslist-modal.component';

describe('ArmorAddonslistModalComponent', () => {
  let component: ArmorAddonslistModalComponent;
  let fixture: ComponentFixture<ArmorAddonslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArmorAddonslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ArmorAddonslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
