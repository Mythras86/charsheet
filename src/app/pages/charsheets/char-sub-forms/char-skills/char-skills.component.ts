import { Component, Input, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { attributes } from '../char-attributes/attributes.model';
import { ResourcesService } from '../char-resources/resources.service';
import { CharSubServices } from '../services-for-subforms';
import { charSkills } from './skills.util';

@Component({
  selector: 'app-char-skills',
  templateUrl: './char-skills.component.html',
  styleUrls: ['./char-skills.component.css']
})
export class CharSkillsComponent implements OnInit {

  @Input() skillsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    public charSubs: CharSubServices,
    public resServ: ResourcesService
  ) { }

  public nopoints:boolean = false;
  public yourSkills:number = 0;


  public get skills(): FormArray | null {
    if(!this.skillsForm) {
      return null;
    }
    return this.skillsForm.controls.skills as FormArray;
  }

  addSkill(): void {
    const skillsForm = this.fb.group({
      skillName: ['', {value: '', disabled: false}],
      skillDesc: ['', {value: '', disabled: false}],
      skillLevel: [1, {value: 1, disabled: false}],
    });
    this.skills?.push(skillsForm);
  }

  removeSkill(i:number): void {
    this.skills?.removeAt(i);
  }

  getSkills(): Array<any> {
    return charSkills;
  }

  getAttrNames(i:number): Array<any> {
    const selectedSkill = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('skillName')?.value;
    const fcname = charSkills.filter(x=>x.szakertelem == selectedSkill).map(x=>x.fcname);
    const attrname = attributes.filter(x=>x.fcname == fcname).map(x=>x.rovidnev);
    return attrname;
  }

  getSkillLevel(i:number) {
    const skillvalue = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('skillLevel')?.value;
    return skillvalue;
  }

  increment(i:number) {
    const skillvalue = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('skillLevel')?.value;
    const skillFgroup = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('skillLevel')?.patchValue(
      skillvalue+1
    );
    return skillFgroup;
  }

  decrement(i:number) {
    const skillvalue = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('skillLevel')?.value;
    const skillFgroup = ((this.skillsForm.get('skills') as FormArray).at(i) as FormGroup).get('skillLevel')?.patchValue(
      skillvalue-1
    );
    return skillFgroup;
  }

  get skillValues():any {
    return this.skillsForm.get('skills') as FormArray;
  }

  getSum():number | null {
    const sumSkills = this.skillValues.value.reduce((prev: number, next: { skillLevel: number; }) => prev + +next.skillLevel, 0);
    if (this.yourSkills-sumSkills <= 0) {
      this.nopoints = true;
      return this.yourSkills-sumSkills;
    } else {
      this.nopoints = false;
      return this.yourSkills-sumSkills;
    }
  }

  ngOnInit(): void {
    this.resServ.getSkillPoints.subscribe(yourSkills => this.yourSkills = yourSkills);
  }
}
