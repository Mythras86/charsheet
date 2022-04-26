import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupConfig } from '../../char.fgconfing';
import { Resources } from './resources.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private fb: FormBuilder
  ) { }

  createResources(): FormGroup {
    const resources: FormGroupConfig<Resources> = {
      basekarma: [250, {value:250, disabled: false}],
      gainedkarma: [0, {value:0, disabled: false}],
      karmaonattr: [0, {value:0, disabled: false}],
      karmaonskills: [0, {value:0, disabled: false}],
      karmaonmoney: [0, {value:0, disabled: false}],
      karmaonmagic: [0, {value:0, disabled: false}],
      magiconspells: [0, {value:0, disabled: false}],
      magiconspirits: [0, {value:0, disabled: false}],
      magiconartifacts: [0, {value:0, disabled: false}],
      moneyonwapons: [0, {value:0, disabled: false}],
      moneyontools: [0, {value:0, disabled: false}],
      moneyoncyber: [0, {value:0, disabled: false}],
      moneyonsoftware: [0, {value:0, disabled: false}],
      moneyonrides: [0, {value:0, disabled: false}],
      moneyonartifacts: [0, {value:0, disabled: false}],
    };
    return this.fb.group(resources);
  };
}
