import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})

export class CharWeaponsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  public selectedWeaponID: Subject<string> = new Subject;

  public spentMoneyOnWeapons: number = 0;

  createWeapons(): FormGroup {
    const weaponsForm = {
      weapons: this.fb.array([]),
    };
    return this.fb.group(weaponsForm);
  }

  sendMoneyOnWeapons(money: number) {
    return money;
  }

  onWeaponSelected(id: string) {
    this.selectedWeaponID.next(id);
  }

}
