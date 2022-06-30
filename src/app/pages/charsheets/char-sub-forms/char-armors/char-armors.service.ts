import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharArmorsService {

  constructor(
    private fb: FormBuilder,
  ) { }

  public selectedArmorID: Subject<string> = new Subject;

  createWeapons(): FormGroup {
    const armorsForm = {
      armors: this.fb.array([]),
    };
    return this.fb.group(armorsForm);
  }

  onWeaponSelected(id: string) {
    this.selectedArmorID.next(id);
  }

}
