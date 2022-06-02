import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CharSubServices } from '../services-for-subforms';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';
import { AddonsService } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.service';
import { Weapons } from 'src/app/pages/Armory/Weapons/weapons/weapons.model';
import { ResourcesService } from '../char-resources/resources.service';
import { Addons } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.model';

@Component({
  selector: 'app-char-weapons',
  templateUrl: './char-weapons.component.html',
  styleUrls: ['./char-weapons.component.css']
})
export class CharWeaponsComponent implements OnInit, AfterContentChecked {

  @Input() weaponsForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public charSubs: CharSubServices,
    public weapServ: WeaponsService,
    public addonServ: AddonsService,
    public resServ: ResourcesService,
    ) {

    }

  public yourMoney:number = 0;
  public nomoney:boolean = false;

  public get weapons(): FormArray | null {
    if(!this.weaponsForm) {
      return null;
    }
    return this.weaponsForm.controls.weapons as FormArray;
  }

  addWeapon(): void {
    const weaponsForm = this.fb.group({
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
      over: ['', {value: '', disabled: false}],
      overAddonPrice: [0, {value: 0, disabled: false}],
      overAddonWeight: [0, {value: 0, disabled: false}],
      overAddonDesc: ['', {value: '', disabled: false}],
    });
    this.weapons?.push(weaponsForm);
  }

  removeWeapon(i:number): void {
    this.weapons?.removeAt(i);
  }

  getDetails(i: number, fckey: keyof Weapons):any {
    let selectedWeapon = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('weaponName')?.value;
    let detail = this.weapServ.weaponslist.filter(x=>x.weaponName == selectedWeapon).map(x=>x[fckey]);
    let other = <FormArray>this.weaponsForm.controls['weapons'];
    other.controls[i].patchValue({[fckey]: detail});
    return detail;
  }

  getAddonsByPlace(place: string):Array<any> {
    let addonlist = this.addonServ.addonslist.filter(x => x.addonPlace == place);
    return addonlist;
  }

  getAddonDetails(fcname: string, i: number, fckey: keyof Addons):any {
    let selectedAddon = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get(fcname)?.value;
    let detail = this.addonServ.addonslist.filter(x=>x.addonName == selectedAddon).map(x=>x[fckey]);
    let other = <FormArray>this.weaponsForm.controls['weapons'];
    other.controls[i].patchValue({[fcname + fckey]: detail});
    return detail;
  }

  get weaponsValues():any {
    return this.weaponsForm.get('weapons') as FormArray;
  }

  getSum():number | null {
    const sumWeapons = this.weaponsValues.value.reduce((prev: number, next: { weaponPrice: number; }) => prev + +next.weaponPrice, 0);
    if (this.yourMoney-sumWeapons <= 0) {
      this.nomoney = true;
      return this.yourMoney-sumWeapons;
    } else {
      this.nomoney = false;
      return this.yourMoney-sumWeapons;
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.weapServ.getWeapons();
    this.addonServ.getAddons();
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
