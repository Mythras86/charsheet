import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharToolsComponent } from './char-tools.component';

describe('CharToolsComponent', () => {
  let component: CharToolsComponent;
  let fixture: ComponentFixture<CharToolsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharToolsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharToolsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
