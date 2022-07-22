import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';

@Injectable({
  providedIn: 'root'
})
export class CharExplosivesService {

  constructor(
    private fb: FormBuilder,
    public weapServ: WeaponsService,
  ) { }

  addExplosive(id: string) {
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
    weaponCount: [1, {value: 1, disabled: false}],
    weaponTotalPrice: [0, {value: 0, disabled: false}],
    weaponTotalWeight: [0, {value: 0, disabled: false}],
    });
    return toolsForm;
  }
}
