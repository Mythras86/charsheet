import { Injectable } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { WeaponAddonsService } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.service';

@Injectable({
  providedIn: 'root'
})
export class CharWeaponAddonsService {

  constructor(
    public addonServ: WeaponAddonsService
  ) { }

  addAddon(id:string, i:number, tag:number, toolsForm: FormGroup) {
    if (id == 'none') {
      return;
    }
    ((toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonName'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonName)[0]
    );
    ((toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAddPrice'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonAddPrice)[0]
    );
    ((toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAddWeight'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonAddWeight)[0]
    );
    ((toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMultiPrice'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonMultiPrice)[0]
    );
    ((toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMultiWeight'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonMultiWeight)[0]
    );
    ((toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonDesc'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonDesc)[0]
    );
  }
}
