import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupConfig } from '../../char.fgconfing';
import { Attributes } from './attributes.model';

@Injectable({
  providedIn: 'root'
})
export class AttributesService {

  constructor(
    private fb: FormBuilder
  ) { }

  karFizEro:number = 0;
  karFizGyo:number = 0;
  karFizUgy:number = 0;
  karFizAll:number = 0;
  karAsztEro:number = 0;
  karAsztGyo:number = 0;
  karAsztUgy:number = 0;
  karAsztAll:number = 0;
  karEsszencia:number = 0;
  karMagia:number = 0;
  karErzekeles:number = 0;
  karKockatartalek:number = 0;

  karFullAszt:number = 0;
  karFullFiz:number = 0;


  createAttributes(): FormGroup {
    const attributes: FormGroupConfig<Attributes> = {
      //fizikai
      karFizEro: [0, {value:0, disabled: false}],
      karFizGyo: [0, {value:0, disabled: false}],
      karFizUgy: [0, {value:0, disabled: false}],
      karFizAll: [0, {value:0, disabled: false}],
      //asztrál
      karAsztEro: [0, {value:0, disabled: false}],
      karAsztGyo: [0, {value:0, disabled: false}],
      karAsztUgy: [0, {value:0, disabled: false}],
      karAsztAll: [0, {value:0, disabled: false}],
      //speciális
      karEsszencia: [0, {value:0, disabled: false}],
      karMagia: [0, {value:0, disabled: false}],
      karErzekeles: [0, {value:0, disabled: false}],
      karKockatartalek: [0, {value:0, disabled: false}],
    };
    return this.fb.group(attributes);
  };

}
