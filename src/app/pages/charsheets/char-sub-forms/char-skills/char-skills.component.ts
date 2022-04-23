import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-skills',
  templateUrl: './char-skills.component.html',
  styleUrls: ['./char-skills.component.css']
})
export class CharSkillsComponent implements OnInit {

  constructor(private fb: FormBuilder) { }

  @Input() skillsForm!: FormGroup;
  skills!: FormArray;

  addSkills() {
    this.skills.push(this.newSkill());
 }

  getSkills() {
    return this.skillsForm.get("skills") as FormArray;
  }

  newSkill(): FormGroup {
    return this.fb.group({
      skillName: ['', {value:'', disabled: false}],
      skillLevel: [0, {value:0, disabled: false}],
      skillDesc: ['', {value:'', disabled: false}],
    })
 }

  ngOnInit(): void {
  }

}
