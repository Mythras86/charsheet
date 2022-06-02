import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Injectable({providedIn: 'root'})

export class CharWeaponsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  createWeapons(): FormGroup {
    const weaponsForm = {
      weapons: this.fb.array([]),
    };
    return this.fb.group(weaponsForm);
  }

}
