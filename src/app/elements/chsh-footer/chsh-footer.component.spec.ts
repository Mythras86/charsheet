import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChshFooterComponent } from './chsh-footer.component';

describe('ChshFooterComponent', () => {
  let component: ChshFooterComponent;
  let fixture: ComponentFixture<ChshFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChshFooterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChshFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
