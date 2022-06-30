import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { DetailsService } from '../char-details/details.service';
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
    public detailsServ: DetailsService,
  ) { }

  public yourSkills:number = 0;
  public yourLanguage:string = '';

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

  getControls(arrayname:string):Array<any> {
    const controls = (this.skillsForm.get(arrayname) as FormArray).controls;
    return controls;
  }

  getLegends(type:string):string {
    if(type == 'activeSkills') {
      return 'Aktív';
    }
    if(type == 'knowledgeSkills') {
      return 'Ismeret';
    }
    if(type == 'languageSkills') {
      return 'Nyelvi';
    }
    return '';
  }

  getTypes():Array<any> {
    const faName = [...new Set(charSkills.map(x=> x.faName))];
    return faName;
  }

  getGroups(faName: string):Array<any> {
    const groups = [...new Set(charSkills.filter(x=> x.faName == faName).map(x=> x.group))];
    return groups;
  }

  getOptions(group:string):Array<any> {
    const options = charSkills.filter(x=> x.group == group);
    return options;
  }

  addSkill(faName: string): void {
    const skillsForm = this.fb.group({
      skillName: ['', {value: '', disabled: false}],
      skillDesc: ['', {value: '', disabled: false}],
      skillLevel: [1, {value: 1, disabled: false}],
    });
    (this.skillsForm.get(faName) as FormArray).push(skillsForm);
  }

  removeSkill(i:number, faName:string): void {
    (this.skillsForm.get(faName) as FormArray).removeAt(i);
  }

  getSkillLevel(i:number, faName:string) {
    const skillvalue = ((this.skillsForm.get(faName) as FormArray).at(i) as FormGroup).get('skillLevel')?.value;
    return skillvalue;
  }

  getSumSub(faName:string):number | null {
    const skillarrayname = this.skillsForm.get(faName) as FormArray;
    const sumSkills = skillarrayname.value.reduce((prev: number, next: { skillLevel: number; }) => prev + +next.skillLevel, 0);
    return sumSkills;
  }

  getSumAll():number {
    const sumall = this.getSumSub('activeSkills')+this.getSumSub('knowledgeSkills')+this.getSumSub('languageSkills');
    return sumall;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  addFirstLanguage(langName:string, langDesc:string, baseLvl: number): void {
    const skillsForm = this.fb.group({
      skillName: [langName, {value: langName, disabled: false}],
      skillDesc: [langDesc, {value: langDesc, disabled: false}],
      skillLevel: [baseLvl, {value: baseLvl, disabled: false}],
    });
    (this.skillsForm.get('languageSkills') as FormArray).push(skillsForm);
  }

  ngOnInit(): void {
    this.resServ.getSkillPoints.subscribe(yourSkills => this.yourSkills = yourSkills);
    this.detailsServ.getLanguage.subscribe(yourLanguage => {
      this.yourLanguage = yourLanguage;
      if(this.yourLanguage !== '') {
        this.addFirstLanguage('Anyanyelv', this.yourLanguage, 3)
        this.addFirstLanguage('Anyanyelv í/o', this.yourLanguage, 3)
      }
    })
  }
}
