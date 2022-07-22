import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberslistModalComponent } from './cyberslist-modal.component';

describe('CyberslistModalComponent', () => {
  let component: CyberslistModalComponent;
  let fixture: ComponentFixture<CyberslistModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberslistModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberslistModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
