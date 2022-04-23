import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharSkillsComponent } from './char-skills.component';

describe('CharSkillsComponent', () => {
  let component: CharSkillsComponent;
  let fixture: ComponentFixture<CharSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CharSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
