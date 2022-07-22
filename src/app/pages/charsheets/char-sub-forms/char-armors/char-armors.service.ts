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

  createArmors(): FormGroup {
    const armorsForm = {
      helms: this.fb.array([]),
      armors: this.fb.array([]),
      shields: this.fb.array([]),
    };
    return this.fb.group(armorsForm);
  }
}
