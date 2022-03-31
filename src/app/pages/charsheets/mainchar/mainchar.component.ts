import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Attributes } from '../char-sub-forms/char-attributes/char-attributes-model';
import { CharAttributesComponent } from '../char-sub-forms/char-attributes/char-attributes.component';
import { Details } from '../char-sub-forms/char-details/char-details-model';
import { CharDetailsComponent } from '../char-sub-forms/char-details/char-details.component';
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
    private fb: FormBuilder
    ) { }

    private createDetails(): FormGroup {
      const details: FormGroupConfig<Details> = {
        teljesnev: ['', {value:'', disabled: false}],
        becenev: ['', {value:'', disabled: false}],
        alnev: ['', {value:'', disabled: false}],
        nem: ['', {value:'', disabled: false}],
        faj: ['Ember', {value:'Ember', disabled: false}],
        eletkor:[0, {value: 0, disabled: false}],
        magassag: [0, {value: 0, disabled: false}],
        testsuly: [0, {value: 0, disabled: false}],
        testalkat: ['', {value:'', disabled: false}],
        szemszin: ['', {value:'', disabled: false}],
        hajszin: ['', {value:'', disabled: false}],
        borszin: ['', {value:'', disabled: false}],
      };
      return this.fb.group(details);
    };

    private createAttributes() {
      const attributes: FormGroupConfig<Attributes> = {
        ero: [1, {value:1, disabled: false}],
        gyo: [1, {value:1, disabled: false}],
        ugy: [1, {value:1, disabled: false}],
        fiz: [1, {value:1, disabled: false}],
        aka: [1, {value:1, disabled: false}],
        int: [1, {value:1, disabled: false}],
        log: [1, {value:1, disabled: false}],
        kit: [1, {value:1, disabled: false}],
        kar: [1, {value:1, disabled: false}],
        mag: [0, {value:0, disabled: false}],
        kta: [0, {value:0, disabled: false}],
        erz: [1, {value:1, disabled: false}],
      };
      return this.fb.group(attributes);
    };

  ngOnInit(): void {
    this.mainCharForm = this.fb.group({
      detailsForm: this.createDetails(),
      attributesForm: this.createAttributes()
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

}
