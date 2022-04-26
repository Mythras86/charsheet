import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class SkillsService {

  constructor(
    private fb: FormBuilder
  ) { }

  createSkills(): FormGroup {
    const skillsForm = {
      skills: this.fb.array([])
    };
    return this.fb.group(skillsForm);
  }
}
