import { Component, Input} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-skills',
  templateUrl: './char-skills.component.html',
  styleUrls: ['./char-skills.component.css']
})
export class CharSkillsComponent {

  @Input() skillsForm!: FormGroup;

  constructor(
    private fb: FormBuilder
  ) { }

  public get skills(): FormArray | null {
    if(!this.skillsForm) {
      return null;
    }
    return this.skillsForm.controls.skills as FormArray;
  }

  addSkill(): void {
    const skillsForm = this.fb.group({
      skillName: ['', {value: '', disabled: false}],
      skillLevel: [0, {value: 0, disabled: false}],
      skillDesc: ['', {value: '', disabled: false}],
    });
    this.skills?.push(skillsForm);
  }

  removeSkill(i:number): void {
    this.skills?.removeAt(i);
  }

}
