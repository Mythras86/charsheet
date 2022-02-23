import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListcharsComponent } from './listchars.component';

describe('ListcharsComponent', () => {
  let component: ListcharsComponent;
  let fixture: ComponentFixture<ListcharsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListcharsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListcharsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
