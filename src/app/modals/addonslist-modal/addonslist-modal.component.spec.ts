import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddonslistModalComponent } from './addonslist-modal.component';

describe('AddonslistModalComponent', () => {
  let component: AddonslistModalComponent;
  let fixture: ComponentFixture<AddonslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddonslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddonslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
