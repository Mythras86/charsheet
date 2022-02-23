import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewcharComponent } from './newchar.component';

describe('NewcharComponent', () => {
  let component: NewcharComponent;
  let fixture: ComponentFixture<NewcharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewcharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewcharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
