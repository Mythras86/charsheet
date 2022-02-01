import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChshHeaderComponent } from './chsh-header.component';

describe('ChshHeaderComponent', () => {
  let component: ChshHeaderComponent;
  let fixture: ComponentFixture<ChshHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChshHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChshHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
