import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AttributesService } from '../char-sub-forms/char-attributes/attributes.service';
import { DetailsService } from '../char-sub-forms/char-details/details.service';
import { ResourcesService } from '../char-sub-forms/char-resources/resources.service';
import { SkillsService } from '../char-sub-forms/char-skills/skills.service';
import { CharWeaponsService } from '../char-sub-forms/char-weapons/char-weapons.service';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-mainchar',
  templateUrl: './mainchar.component.html',
  styleUrls: ['./mainchar.component.css']
})
export class MainCharComponent implements OnInit {

  isLoading = false;
  mainCharForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private charService: CharService,
    private detailsServ: DetailsService,
    private attributesServ: AttributesService,
    private resourcesServ: ResourcesService,
    private skillsServ: SkillsService,
    private weaponsServ: CharWeaponsService
    ) { }


  ngOnInit(): void {
    this.mainCharForm = this.fb.group({
      detailsForm: this.detailsServ.createDetails(),
      attributesForm: this.attributesServ.createAttributes(),
      resourcesForm: this.resourcesServ.createResources(),
      skillsForm: this.skillsServ.createSkills(),
      weaponsForm: this.weaponsServ.createWeapons()
    });
  }

  createNewChar() {
    var form = this.mainCharForm;
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.charService.addOneChar(
      //details
      form.value.charName,
      form.value.charClass,
      form.value.charDesc,
      //attributes
      form.value.fizikum,
      form.value.gyorsasag,
      form.value.ugyesseg,
      form.value.allokepesseg,
      //eqiupment
      form.value.charEqu,
      //weapon
      form.value.charFegyver
      );
  }

  public get detailsForm(): FormGroup {
    return this.mainCharForm.get('detailsForm') as FormGroup;
  }
  public get attributesForm(): FormGroup {
    return this.mainCharForm.get('attributesForm') as FormGroup;
  }
  public get resourcesForm(): FormGroup {
    return this.mainCharForm.get('resourcesForm') as FormGroup;
  }
  public get skillsForm(): FormGroup {
    return this.mainCharForm.get('skillsForm') as FormGroup;
  }
  public get weaponsForm(): FormGroup {
    return this.mainCharForm.get('weaponsForm') as FormGroup;
  }
}
