import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ResourcesService } from '../char-resources/resources.service';
import { charSkills } from './skills.util';

@Component({
  selector: 'app-char-skills',
  templateUrl: './char-skills.component.html',
  styleUrls: ['./char-skills.component.css']
})
export class CharSkillsComponent implements OnInit, AfterContentChecked {

  @Input() skillsForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public resServ: ResourcesService,
  ) { }

  public yourSkills:number = 0;

  public get activeSkills(): FormArray | null {
    if(!this.skillsForm) {
      return null;
    }
    return this.skillsForm.controls.activeSkills as FormArray;
  }

  public get knowledgeSkills(): FormArray | null {
    if(!this.skillsForm) {
      return null;
    }
    return this.skillsForm.controls.knowledgeSkills as FormArray;
  }

  public get languageSkills(): FormArray | null {
    if(!this.skillsForm) {
      return null;
    }
    return this.skillsForm.controls.languageSkills as FormArray;
  }

  getFormcontrol(index: number, arrayname:string) {
    let fc = ((this.skillsForm.get(arrayname) as FormArray).at(index) as FormGroup).get('skillLevel');
    return fc;
  }

  getGroups(legend: string):Array<any> {
    const groups = [...new Set(charSkills.filter(x=> x.legend == legend).map(x=> x.group))];
    return groups;
  }

  getOptions(group:string):Array<any> {
    const options = charSkills.filter(x=> x.group == group);
    return options;
  }

  addSkill(arrayname: string): void {
    const skillsForm = this.fb.group({
      skillName: ['', {value: '', disabled: false}],
      skillDesc: ['', {value: '', disabled: false}],
      skillLevel: [1, {value: 1, disabled: false}],
    });
    (this.skillsForm.get(arrayname) as FormArray).push(skillsForm);
  }

  removeSkill(i:number, arrayname:string): void {
    (this.skillsForm.get(arrayname) as FormArray).removeAt(i);
  }

  getSkillLevel(i:number, arrayname:string) {
    const skillvalue = ((this.skillsForm.get(arrayname) as FormArray).at(i) as FormGroup).get('skillLevel')?.value;
    return skillvalue;
  }

  getSum(arrayname:string):number | null {
    const skillarrayname = this.skillsForm.get(arrayname) as FormArray;
    const sumSkills = skillarrayname.value.reduce((prev: number, next: { skillLevel: number; }) => prev + +next.skillLevel, 0);
    return sumSkills;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.resServ.getSkillPoints.subscribe(yourSkills => this.yourSkills = yourSkills);
  }
}
