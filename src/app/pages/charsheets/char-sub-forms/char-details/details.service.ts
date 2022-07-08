import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, RequiredValidator, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormGroupConfig } from '../../char.fgconfing';
import { Details } from './details.model';

@Injectable({
  providedIn: 'root'
})
export class DetailsService {

  constructor(
    private fb: FormBuilder
  ) { }

  public selectedRace = new BehaviorSubject<string>('');
  getRace = this.selectedRace.asObservable();

  updateRace(yourRace: string): void {
    this.selectedRace.next(yourRace);
  }

  public selectedMagic = new BehaviorSubject<string>('');
  getMagic = this.selectedMagic.asObservable();

  updateMagic(yourMagic: string): void {
    this.selectedMagic.next(yourMagic);
  }

  public selectedLanguage = new BehaviorSubject<string>('');
  getLanguage = this.selectedLanguage.asObservable();

  updateLanguage(yourLanguage: string): void {
    this.selectedLanguage.next(yourLanguage);
  }

  createDetails(): FormGroup {
    const details: FormGroupConfig<Details> = {
    // szöveges
      teljesnev: ['', {value:'', disabled: false}, Validators.required],
      becenev: ['', {value:'', disabled: false}, Validators.required],
      alnev: ['', {value:'', disabled: false}, Validators.required],
      testalkat: ['', {value:'', disabled: false}, Validators.required],
      hajstilus: ['', {value:'', disabled: false}, Validators.required],
      szakall: ['', {value:'', disabled: false}, Validators.required],
    // értékválasztó
      nem: ['', {value:'', disabled: false}, Validators.required],
      faj: ['', {value:'', disabled: false}, Validators.required],
      anyanyelv: ['', {value:'', disabled: false}, Validators.required],
      magikus: ['', {value:'', disabled: false}, Validators.required],
      spec: ['', {value:'', disabled: false}, Validators.required],
      eletkor:['0', {value: '0', disabled: false}, Validators.required],
      magassag: ['0', {value: '0', disabled: false}, Validators.required],
      testsuly: ['0', {value: '75', disabled: false}, Validators.required],
    // szín
      szemszin: ['#503335', {value:'#503335', disabled: false}, Validators.required],
      hajszin: ['#503335', {value:'#503335', disabled: false}, Validators.required],
      szorszin: ['#503335', {value:'#503335', disabled: false}, Validators.required],
      borszin: ['#ecbcb4', {value:'#ecbcb4', disabled: false}, Validators.required],
    // hosszú szöveg
      felelem: ['', {value: '', disabled: false}, Validators.required],
      osztonzo: ['', {value: '', disabled: false}, Validators.required],
      gyulolet: ['', {value: '', disabled: false}, Validators.required],
      kedvenc: ['', {value: '', disabled: false}, Validators.required],
      irtozat: ['', {value: '', disabled: false}, Validators.required],
      vonzalom: ['', {value: '', disabled: false}, Validators.required],
    };
    return this.fb.group(details);
  };


}
