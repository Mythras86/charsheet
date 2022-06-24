import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';
import { AddonsService } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.service';
import { ResourcesService } from '../char-resources/resources.service';
import { CharWeaponsService } from './char-weapons.service';
import { ModalService } from 'src/app/modals/modal.service';
import { WeaponslistModalComponent } from 'src/app/modals/weaponslist-modal/weaponslist-modal.component';
import { AddonslistModalComponent } from 'src/app/modals/addonslist-modal/addonslist-modal.component';

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
    public addonServ: AddonsService,
    public resServ: ResourcesService,
    public charWeaponsServ: CharWeaponsService,
    private modalService: ModalService,
    ) { }

  public yourMoney:number = 0;
  public spentOnWeapons: number = 0;

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
      weaponMods: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponMods)[0],
      weaponRange: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponRange)[0],
      weaponPower: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponPower)[0],
      weaponDamage: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDamage)[0],
      weaponDmgType: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDmgType)[0],
      weaponWeight: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponWeight)[0],
      weaponPrice: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponPrice)[0],
      weaponDesc: this.weapServ.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDesc)[0],
      addonName1: ['', {value: '', disabled: false}],
      addonPrice1: [0, {value: 0, disabled: false}],
      addonWeight1: [0, {value: 0, disabled: false}],
      addonDesc1: ['', {value: '', disabled: false}],
      addonName2: ['', {value: '', disabled: false}],
      addonPrice2: [0, {value: 0, disabled: false}],
      addonWeight2: [0, {value: 0, disabled: false}],
      addonDesc2: ['', {value: '', disabled: false}],
      addonName3: ['', {value: '', disabled: false}],
      addonPrice3: [0, {value: 0, disabled: false}],
      addonWeight3: [0, {value: 0, disabled: false}],
      addonDesc3: ['', {value: '', disabled: false}],
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
    const kieg1:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addon' + tag + '1')?.value;
    const kieg2:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addon' + tag + '2')?.value;
    const kieg3:number = ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addon' + tag + '3')?.value;
    return weapon+kieg1+kieg2+kieg3;
  }

  AddAddon(i:number, tag:number, categ:string) {
    this.modalService.openModal(AddonslistModalComponent, {kiegFilter: 'kieg'+tag, categFilter: categ}).subscribe(w => this.onAddAddon(w, i, tag));
  }

  onAddAddon(id:string, i:number, tag:number) {
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonName'+tag)?.patchValue(
      this.addonServ.addonsList.filter(x=>x.id == id).map(x=>x.addonName)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonPrice'+tag)?.patchValue(
      this.addonServ.addonsList.filter(x=>x.id == id).map(x=>x.addonPrice)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonWeight'+tag)?.patchValue(
      this.addonServ.addonsList.filter(x=>x.id == id).map(x=>x.addonWeight)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonDesc'+tag)?.patchValue(
      this.addonServ.addonsList.filter(x=>x.id == id).map(x=>x.addonDesc)[0]
    );
  }

  get weaponsValues():any {
    return this.weaponsForm.get('weapons') as FormArray;
  }

  getSum():number | null {
    const sumWeapons:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { weaponPrice: number; }) => prev + +next.weaponPrice, 0);
    const sumKieg1:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { addonPrice1: number; }) => prev + +next.addonPrice1, 0);
    const sumKieg2:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { addonPrice2: number; }) => prev + +next.addonPrice2, 0);
    const sumKieg3:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { addonPrice3: number; }) => prev + +next.addonPrice3, 0);
    const sumAll:number = sumWeapons + sumKieg1 + sumKieg2 + sumKieg3;
    this.resServ.updateMoney(this.yourMoney-sumAll);
    return sumAll;
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
        this.addonServ.addonsList = w;
      }
    });
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
