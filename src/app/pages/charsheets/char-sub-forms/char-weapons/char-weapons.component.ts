import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CharSubServices } from '../services-for-subforms';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';
import { AddonsService } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.service';
import { ResourcesService } from '../char-resources/resources.service';
import { Addons } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.model';
import { CharWeaponsService } from './char-weapons.service';
import { ModalService } from 'src/app/modals/modal.service';
import { WeaponslistModalComponent } from 'src/app/modals/weaponslist-modal/weaponslist-modal.component';
import { Weapons } from 'src/app/pages/Armory/Weapons/weapons/weapons.model';
import { AddonslistModalComponent } from 'src/app/modals/addonslist-modal/addonslist-modal.component';

@Component({
  selector: 'app-char-weapons',
  templateUrl: './char-weapons.component.html',
  styleUrls: ['./char-weapons.component.css']
})
export class CharWeaponsComponent implements OnInit, AfterContentChecked {

  @Input() weaponsForm!: FormGroup

  private weaponsList: Weapons[] = [];
  private addonsList: Addons[] = [];

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public charSubs: CharSubServices,
    public weapServ: WeaponsService,
    public addonServ: AddonsService,
    public resServ: ResourcesService,
    public charWeaponsServ: CharWeaponsService,
    private modalService: ModalService,
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

  addWeapon():void {
    this.modalService.openModal(WeaponslistModalComponent, null).subscribe(w => this.onAddWeapon(w));
  }

  onAddWeapon(id: string) {
      const weaponsForm = this.fb.group({
      weaponName: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponName),
      weaponCategory: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponCategory),
      weaponType: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponType),
      weaponMods: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponMods),
      weaponRange: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponRange),
      weaponPower: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponPower),
      weaponDamage: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDamage),
      weaponDmgType: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDmgType),
      weaponWeight: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponWeight),
      weaponPrice: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponPrice),
      weaponDesc: this.weaponsList.filter(x=>x.id == id).map(x=>x.weaponDesc),
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

  AddAddon(i:number, tag:number, categ:string) {
    this.modalService.openModal(AddonslistModalComponent, {kiegFilter: 'kieg'+tag, categFilter: categ}).subscribe(w => this.onAddAddon(w, i, tag));
  }

  onAddAddon(id:string, i:number, tag:number) {

    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonName'+tag)?.patchValue(
      this.addonsList.filter(x=>x.id == id).map(x=>x.addonName)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonPrice'+tag)?.patchValue(
      this.addonsList.filter(x=>x.id == id).map(x=>x.addonPrice)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonWeight'+tag)?.patchValue(
      this.addonsList.filter(x=>x.id == id).map(x=>x.addonWeight)[0]
    );
    ((this.weaponsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonDesc'+tag)?.patchValue(
      this.addonsList.filter(x=>x.id == id).map(x=>x.addonDesc)[0]
    );
  }

  get weaponsValues():any {
    return this.weaponsForm.get('weapons') as FormArray;
  }

  getSum():number | null {
    const sumWeapons:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { weaponPrice: number; }) => prev + +next.weaponPrice, 0);
    const sumOver:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { addonPriceOver: number; }) => prev + +next.addonPriceOver, 0);
    const sumBelow:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { addonPriceBelow: number; }) => prev + +next.addonPriceBelow, 0);
    const sumBarrel:number = (this.weaponsForm.get('weapons') as FormArray).value.reduce((prev: number, next: { addonPriceBarrel: number; }) => prev + +next.addonPriceBarrel, 0);
    const sumAll:number = sumWeapons + sumBarrel + sumOver + sumBelow;
    this.charWeaponsServ.spentMoneyOnWeapons = sumAll;
    console.log(sumWeapons);
    console.log(sumOver);
    console.log(sumBelow);
    console.log(sumBarrel);


    if (this.yourMoney-sumAll <= 0) {
      this.nomoney = true;
      return this.yourMoney-sumAll;
    } else {
      this.nomoney = false;
      return this.yourMoney-sumAll;
    }
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.weapServ.getWeapons().subscribe({
      next: (w) => {
        this.weaponsList = w;
      }
    });
    this.addonServ.getAddons().subscribe({
      next: (w) => {
        this.addonsList = w;
      }
    });
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
