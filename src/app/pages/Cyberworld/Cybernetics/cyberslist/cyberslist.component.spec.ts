import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberslistComponent } from './cyberslist.component';

describe('CyberslistComponent', () => {
  let component: CyberslistComponent;
  let fixture: ComponentFixture<CyberslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
