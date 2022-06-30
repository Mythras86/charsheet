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
      karMagia: [0, {value:0, disabled: false}],
      karKockatartalek: [0, {value:0, disabled: false}],
    };
    return this.fb.group(attributes);
  };

}
