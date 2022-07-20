import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';

@Injectable({providedIn: 'root'})

export class CharWeaponsService {

  constructor(
    private fb: FormBuilder,
    public weapServ: WeaponsService,
    ) { }

    public selectedWeaponID: Subject<string> = new Subject;

    createTools(): FormGroup {
      const weaponsForm = {
        weapons: this.fb.array([]),
        explosives: this.fb.array([]),
        equipments: this.fb.array([]),
      };
      return this.fb.group(weaponsForm);
    }

    onWeaponSelected(id: string) {
      this.selectedWeaponID.next(id);
    }

    addWeapon(id:string) {
      const toolsForm = this.fb.group({
      weaponName: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponName)[0],
      weaponCategory: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponCategory)[0],
      weaponType: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponType)[0],
      weaponClip: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponClip)[0],
      weaponMods: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponMods)[0],
      weaponRange: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponRange)[0],
      weaponPower: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponPower)[0],
      weaponDamage: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDamage)[0],
      weaponDmgType: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDmgType)[0],
      weaponWeight: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponWeight)[0],
      weaponPrice: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponPrice)[0],
      weaponDesc: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDesc)[0],
      addonName1: ['', {value: '', disabled: false}],
      addonAddPrice1: [0, {value: 0, disabled: false}],
      addonMultiPrice1: [1, {value: 1, disabled: false}],
      addonAddWeight1: [0, {value: 0, disabled: false}],
      addonMultiWeight1: [1, {value: 1, disabled: false}],
      addonDesc1: ['', {value: '', disabled: false}],
      addonName2: ['', {value: '', disabled: false}],
      addonAddPrice2: [0, {value: 0, disabled: false}],
      addonMultiPrice2: [1, {value: 1, disabled: false}],
      addonAddWeight2: [0, {value: 0, disabled: false}],
      addonMultiWeight2: [1, {value: 1, disabled: false}],
      addonDesc2: ['', {value: '', disabled: false}],
      addonName3: ['', {value: '', disabled: false}],
      addonAddPrice3: [0, {value: 0, disabled: false}],
      addonMultiPrice3: [1, {value: 1, disabled: false}],
      addonAddWeight3: [0, {value: 0, disabled: false}],
      addonMultiWeight3: [1, {value: 1, disabled: false}],
      addonDesc3: ['', {value: '', disabled: false}],
      addonName4: ['', {value: '', disabled: false}],
      addonAddPrice4: [0, {value: 0, disabled: false}],
      addonMultiPrice4: [1, {value: 1, disabled: false}],
      addonAddWeight4: [0, {value: 0, disabled: false}],
      addonMultiWeight4: [1, {value: 1, disabled: false}],
      addonDesc4: ['', {value: '', disabled: false}],
      weaponTotalPrice: [0, {value: 0, disabled: false}],
      weaponTotalWeight: [0, {value: 0, disabled: false}],
    });
    return toolsForm;
  }
}
