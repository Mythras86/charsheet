import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CharSubServices } from '../services-for-subforms';
import { Weapons } from './weapons.model';
import { WeaponsService } from './weapons.service';

@Component({
  selector: 'app-char-weapons',
  templateUrl: './char-weapons.component.html',
  styleUrls: ['./char-weapons.component.css']
})
export class CharWeaponsComponent implements OnInit {

  @Input() weaponsForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    public charSubs: CharSubServices,
    public weapServ: WeaponsService,
    ) {}

  public nomoney:boolean = false;

  public get weapons(): FormArray | null {
    if(!this.weaponsForm) {
      return null;
    }
    return this.weaponsForm.controls.weapons as FormArray;
  }

  addWeapon(): void {
    const weaponsForm = this.fb.group({
      id: ['', {value: '', disabled: false}],
      weaponName: ['', {value: '', disabled: false}],
      weaponCategory: ['', {value: '', disabled: false}],
      weaponType: ['', {value: '', disabled: false}],
      weaponMods: ['', {value: '', disabled: false}],
      weaponRange: [0, {value: 0, disabled: false}],
      weaponPower: [0, {value: 0, disabled: false}],
      weaponDamage: [0, {value: 0, disabled: false}],
      weaponWeight: [0, {value: 0, disabled: false}],
      weaponPrice: [0, {value: 0, disabled: false}],
      weaponDesc: ['', {value: '', disabled: false}],
    });
    this.weapons?.push(weaponsForm);
  }

  removeWeapon(i:number): void {
    this.weapons?.removeAt(i);
  }

  getDetails(i: number, fckey: keyof Weapons):Array<any> {
    const selectedWeapon = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('weaponName')?.value;
    const detail = this.weapServ.weaponslist.filter(x=>x.weaponName == selectedWeapon).map(x=>x[fckey]);
    return detail;
  }

  ngOnInit(): void {
    this.weapServ.getWeapons();
  }

}
