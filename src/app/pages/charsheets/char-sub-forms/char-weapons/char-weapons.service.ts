import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CharWeaponsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  public selectedWeaponID: Subject<string> = new Subject;

  createWeapons(): FormGroup {
    const weaponsForm = {
      weapons: this.fb.array([]),
    };
    return this.fb.group(weaponsForm);
  }

  onWeaponSelected(id: string) {
    this.selectedWeaponID.next(id);
  }

}
