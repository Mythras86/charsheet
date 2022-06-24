import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder
  ) { }

  createSkills(): FormGroup {
    const skillsForm = {
      activeSkills: this.fb.array([]),
      knowledgeSkills: this.fb.array([]),
      languageSkills: this.fb.array([]),
    };
    return this.fb.group(skillsForm);
  }
}
