import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Attributes } from '../char-sub-forms/char-attributes/model-for-attributes';
import { Details } from '../char-sub-forms/char-details/model-for-details';
import { Resources } from '../char-sub-forms/char-resources/model-for-resources';
import { Skills } from '../char-sub-forms/char-skills/model-for-skills';
import { FormGroupConfig } from '../char.fgconfing';
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
    public charService: CharService,
    private fb: FormBuilder,
    ) { }

    private createDetails(): FormGroup {
      const details: FormGroupConfig<Details> = {
      // szöveges
        teljesnev: ['', {value:'', disabled: false}],
        becenev: ['', {value:'', disabled: false}],
        alnev: ['', {value:'', disabled: false}],
        testalkat: ['', {value:'', disabled: false}],
        hajstilus: ['', {value:'', disabled: false}],
        szakall: ['', {value:'', disabled: false}],
      // értékválasztó
        nem: ['', {value:'', disabled: false}],
        faj: ['', {value:'', disabled: false}],
        magikus: ['', {value:'', disabled: false}],
        spec: ['', {value:'', disabled: false}],
        eletkor:['30', {value: '30', disabled: false}],
        magassag: ['180', {value: '180', disabled: false}],
        testsuly: ['75', {value: '75', disabled: false}],
      // szín
        szemszin: ['#503335', {value:'#503335', disabled: false}],
        hajszin: ['#503335', {value:'#503335', disabled: false}],
        szorszin: ['#503335', {value:'#503335', disabled: false}],
        borszin: ['#ecbcb4', {value:'#ecbcb4', disabled: false}],
      // hosszú szöveg
        felelem: ['', {value: '', disabled: false}],
        osztonzo: ['', {value: '', disabled: false}],
        gyulolet: ['', {value: '', disabled: false}],
        kedvenc: ['', {value: '', disabled: false}],
        irtozat: ['', {value: '', disabled: false}],
        vonzalom: ['', {value: '', disabled: false}],
      };
      return this.fb.group(details);
    };

    private createAttributes() {
      const attributes: FormGroupConfig<Attributes> = {
        //fizikai
        ero: [0, {value:0, disabled: false}],
        gyo: [0, {value:0, disabled: false}],
        ugy: [0, {value:0, disabled: false}],
        kit: [0, {value:0, disabled: false}],
        //asztrál
        aka: [0, {value:0, disabled: false}],
        int: [0, {value:0, disabled: false}],
        log: [0, {value:0, disabled: false}],
        fegy: [0, {value:0, disabled: false}],
        //speciális
        mag: [0, {value:0, disabled: false}],
        ess: [0, {value:0, disabled: false}],
        kta: [0, {value:0, disabled: false}],
        kezd: [0, {value:0, disabled: false}],
      };
      return this.fb.group(attributes);
    };

    private createResourcesForm() {
      const resources: FormGroupConfig<Resources> = {
        basekarma: [250, {value:250, disabled: false}],
        gainedkarma: [0, {value:0, disabled: false}],
        karmaonattr: [0, {value:0, disabled: false}],
        karmaonskills: [0, {value:0, disabled: false}],
        karmaonmoney: [0, {value:0, disabled: false}],
        karmaonmagic: [0, {value:0, disabled: false}],
        spells: [0, {value:0, disabled: false}],
        spirits: [0, {value:0, disabled: false}],
        magictools: [0, {value:0, disabled: false}],
        moneyonwapons: [0, {value:0, disabled: false}],
        moneyontools: [0, {value:0, disabled: false}],
        moneyoncyber: [0, {value:0, disabled: false}],
        moneyonsoftware: [0, {value:0, disabled: false}],
        moneyonrides: [0, {value:0, disabled: false}],
        moneyonmagic: [0, {value:0, disabled: false}],
      };
      return this.fb.group(resources);
    };

    private createSkillsForm() {
      const skillsForm: FormGroupConfig<Skills> = {
          skillName: ['', {value:'', disabled: false}],
          skillLevel: [0, {value:0, disabled: false}],
          skillDesc: ['', {value:'', disabled: false}],
      };
      return this.fb.group(skillsForm);
    };

  ngOnInit(): void {
    this.mainCharForm = this.fb.group({
      detailsForm: this.createDetails(),
      attributesForm: this.createAttributes(),
      resourcesForm: this.createResourcesForm(),
      skillsForm: this.createSkillsForm()
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
}
