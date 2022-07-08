import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';
import { WeaponAddonsService } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.service';
import { ResourcesService } from '../char-resources/resources.service';
import { CharWeaponsService } from './char-weapons.service';
import { ModalService } from 'src/app/modals/modal.service';
import { WeaponslistModalComponent } from 'src/app/modals/weaponslist-modal/weaponslist-modal.component';
import { AddonslistModalComponent } from 'src/app/modals/weaponaddonslist-modal/weaponaddonslist-modal.component';

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
    public weapServ: WeaponsService,
    public addonServ: WeaponAddonsService,
    public resServ: ResourcesService,
    public charWeaponsServ: CharWeaponsService,
    private modalService: ModalService,
    ) { }

  public yourMoney:number = 0;
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }


  public get weapons(): FormArray | null {
    if(!this.weaponsForm) {
      return null;
    }
    return this.weaponsForm.controls.weapons as FormArray;
  }

  addWeapon():void {
    this.modalService.openModal(WeaponslistModalComponent, null).subscribe(w => this.onAddWeapon(w));
  }

  onAddWeapon(id: string) {
      const weaponsForm = this.fb.group({
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
    this.weapons?.push(weaponsForm);
  }

  removeWeapon(i:number): void {
    this.weapons?.removeAt(i);
  }

  getDetails(i: number, fckey: string):any {
    let detail = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get(fckey)?.value;
    return detail;
  }

  getSubTotal(i:number, tag:string):number {
    const weapon:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('weapon' +tag)?.value;
    const kieg1add:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '1')?.value;
    const kieg2add:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '2')?.value;
    const kieg3add:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '3')?.value;
    const kieg4add:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '4')?.value;
    const kieg1multi:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '1')?.value;
    const kieg2multi:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '2')?.value;
    const kieg3multi:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '3')?.value;
    const kieg4multi:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '4')?.value;
    const total = weapon*kieg1multi*kieg2multi*kieg3multi*kieg4multi+kieg1add+kieg2add+kieg3add+kieg4add;
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('weaponTotal'+tag)?.patchValue(total);
    return Math.round(total);
  }

  AddAddon(i:number, tag:number, categ:string) {
    if (categ == 'Nehézfegyverek') {
      this.modalService.openModal(AddonslistModalComponent, {kiegFilter: 'kieg'+tag, categFilter: 'Tűzfegyverek'}).subscribe(w => this.onAddAddon(w, i, tag));
    }
    this.modalService.openModal(AddonslistModalComponent, {kiegFilter: 'kieg'+tag, categFilter: categ}).subscribe(w => this.onAddAddon(w, i, tag));
  }

  onAddAddon(id:string, i:number, tag:number) {
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonName'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonName)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAddPrice'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonAddPrice)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAddWeight'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonAddWeight)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMultiPrice'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonMultiPrice)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMultiWeight'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonMultiWeight)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonDesc'+tag)?.patchValue(
      this.addonServ.weaponAddonsList.filter(x=>x.id == id).map(x=>x.addonDesc)[0]
    );
  }

  getSum(tag:string):number | null {
    const total:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next:number) => prev + +next['weaponTotal'+tag], 0);
    if (tag == 'Price') {
      this.resServ.getPointsSpent('spentOnWeapons', total);
    }
    return Math.round(total);
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.weapServ.getWeapons().subscribe({
      next: (w) => {
        this.weapServ.weaponsList = w;
      }
    });
    this.addonServ.getAddons().subscribe({
      next: (w) => {
        this.addonServ.weaponAddonsList = w;
      }
    });
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
