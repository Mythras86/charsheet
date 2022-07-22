import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CharArmorsService } from '../char-sub-forms/char-armors/char-armors.service';
import { AttributesService } from '../char-sub-forms/char-attributes/attributes.service';
import { CharCyberneticsService } from '../char-sub-forms/char-cyberworld/char-cybernetics.service';
import { DetailsService } from '../char-sub-forms/char-details/details.service';
import { ResourcesService } from '../char-sub-forms/char-resources/resources.service';
import { SkillsService } from '../char-sub-forms/char-skills/skills.service';
import { CharWeaponsService } from '../char-sub-forms/char-tools/char-weapons.service';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-mainchar',
  templateUrl: './mainchar.component.html',
  styleUrls: ['./mainchar.component.css']
})
export class MainCharComponent implements OnInit, OnDestroy {

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    private charService: CharService,
    private detailsServ: DetailsService,
    private attributesServ: AttributesService,
    private resourcesServ: ResourcesService,
    private skillsServ: SkillsService,
    private weaponsServ: CharWeaponsService,
    private armorsServ: CharArmorsService,
    private cybersServ: CharCyberneticsService,
    ) { }

    isLoading = false;
    mainCharForm: FormGroup;
    public mode:string = 'create';
    public charID:string = '';

    createNewChar() {
    var form = this.mainCharForm.get('detailsForm');
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.charService.addOneChar(
      form.value.teljesnev,
      form.value.becenev,
      form.value.alnev,
      form.value.testalkat,
      form.value.hajstilus,
      form.value.szakall,
      form.value.nem,
      form.value.faj,
      form.value.anyanyelv,
      form.value.magikus,
      form.value.spec,
      form.value.eletkor,
      form.value.magassag,
      form.value.testsuly,
      form.value.szemszin,
      form.value.hajszin,
      form.value.szorszin,
      form.value.borszin,
      form.value.felelem,
      form.value.osztonzo,
      form.value.gyulolet,
      form.value.kedvenc,
      form.value.irtozat,
      form.value.vonzalom,
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
  public get toolsForm(): FormGroup {
    return this.mainCharForm.get('toolsForm') as FormGroup;
  }
  public get armorsForm(): FormGroup {
    return this.mainCharForm.get('armorsForm') as FormGroup;
  }
  public get cyberworldForm(): FormGroup {
    return this.mainCharForm.get('cyberworldForm') as FormGroup;
  }

  ngOnInit(): void {
    this.mainCharForm = this.fb.group({
      detailsForm: this.detailsServ.createDetails(),
      attributesForm: this.attributesServ.createAttributes(),
      resourcesForm: this.resourcesServ.createResources(),
      skillsForm: this.skillsServ.createSkills(),
      toolsForm: this.weaponsServ.createTools(),
      armorsForm: this.armorsServ.createArmors(),
      cyberworldForm: this.cybersServ.createCyberworld(),
    });
  }

  public ngOnDestroy(): void {
    this.charService.setFormData(this.mainCharForm.value);
  }
}
