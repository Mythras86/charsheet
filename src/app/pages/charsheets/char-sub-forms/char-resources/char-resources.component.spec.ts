import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharResourcesComponent } from './char-resources.component';

describe('CharPointdistComponent', () => {
  let component: CharResourcesComponent;
  let fixture: ComponentFixture<CharResourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharResourcesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharResourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
