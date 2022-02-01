import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsheetsComponent } from './charsheets.component';

describe('CharsheetsComponent', () => {
  let component: CharsheetsComponent;
  let fixture: ComponentFixture<CharsheetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharsheetsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharsheetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
