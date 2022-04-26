import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupConfig } from '../../char.fgconfing';
import { Details } from './details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private fb: FormBuilder
  ) { }

  createDetails(): FormGroup {
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
}
