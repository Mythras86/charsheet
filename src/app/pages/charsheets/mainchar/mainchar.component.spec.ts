import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainCharComponent } from './mainchar.component';

describe('NewcharComponent', () => {
  let component: MainCharComponent;
  let fixture: ComponentFixture<MainCharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainCharComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainCharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
