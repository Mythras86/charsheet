import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CyberneticsComponent } from './cybernetics.component';

describe('CyberneticsComponent', () => {
  let component: CyberneticsComponent;
  let fixture: ComponentFixture<CyberneticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CyberneticsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CyberneticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
