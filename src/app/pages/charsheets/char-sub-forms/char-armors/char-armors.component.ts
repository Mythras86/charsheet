import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ArmorAddonslistModalComponent } from 'src/app/modals/armoraddonslist-modal/armoraddonslist-modal.component';
import { ArmorslistModalComponent } from 'src/app/modals/armorslist-modal/armorslist-modal.component';
import { ModalService } from 'src/app/modals/modal.service';
import { ArmorAddonsService } from 'src/app/pages/Armory/Armors/armor-addons/armor-addons.service';
import { ArmorsService } from 'src/app/pages/Armory/Armors/armors/armors.service';
import { ResourcesService } from '../char-resources/resources.service';

@Component({
  selector: 'app-char-armors',
  templateUrl: './char-armors.component.html',
  styleUrls: ['./char-armors.component.css']
})
export class CharArmorsComponent implements OnInit, AfterContentChecked {

  @Input() armorsForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public armorServ: ArmorsService,
    public armorAddonServ: ArmorAddonsService,
    public resServ: ResourcesService,
    private modalService: ModalService,
    public router: Router,
    ) { }

  public yourMoney:number = 0;
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }

  public get helms(): FormArray | null {
    if(!this.armorsForm) {
      return null;
    }
    return this.armorsForm.controls.helms as FormArray;
  }

  public get armors(): FormArray | null {
    if(!this.armorsForm) {
      return null;
    }
    return this.armorsForm.controls.armors as FormArray;
  }

  public get shields(): FormArray | null {
    if(!this.armorsForm) {
      return null;
    }
    return this.armorsForm.controls.shields as FormArray;
  }

  getControls(arrayname:string):Array<any> {
    const controls = (this.armorsForm.get(arrayname) as FormArray)?.controls;
    return controls;
  }

  getLegends(type:string):string {
    if(type == 'helms') {
      return 'Sisakok';
    }
    if(type == 'armors') {
      return 'Páncélok';
    }
    if(type == 'shields') {
      return 'Pajzsok';
    }
    return '';
  }

  getTypes():Array<any> {
    return ['helms', 'armors', 'shields'];
  }

  getDetails(i: number, faName: string, fckey: string):any {
    let detail = ((this.armorsForm.get(faName) as FormArray).at(i) as FormGroup).get(fckey)?.value;
    return detail;
  }

  addArmor(faName: string):void {
    this.modalService.openModal(ArmorslistModalComponent, {categFilter: this.getLegends(faName)}).subscribe(w => this.onAddArmor(w, faName));
  }

  onAddArmor(id: string, faName) {
    if (id == 'none') {
      return;
    }
    const armorsForm = this.fb.group({
      armorName: this.armorServ.armorsList.filter(x=>x.id == id).map(x=>x.armorName)[0],
      armorCategory: this.armorServ.armorsList.filter(x=>x.id == id).map(x=>x.armorCategory)[0],
      armorRating: this.armorServ.armorsList.filter(x=>x.id == id).map(x=>x.armorRating)[0],
      armorWeight: this.armorServ.armorsList.filter(x=>x.id == id).map(x=>x.armorWeight)[0],
      armorPrice: this.armorServ.armorsList.filter(x=>x.id == id).map(x=>x.armorPrice)[0],
      armorDesc: this.armorServ.armorsList.filter(x=>x.id == id).map(x=>x.armorDesc)[0],
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
      armorTotalPrice: [0, {value: 0, disabled: false}],
      armorTotalWeight: [0, {value: 0, disabled: false}],
    });
    (this.armorsForm.get(faName) as FormArray).push(armorsForm);
  }

  removeArmor(i:number, faName:string): void {
    (this.armorsForm.get(faName) as FormArray).removeAt(i);
  }

  getSubTotal(i:number, type:string, tag:string):number {
    const armor:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('armor' +tag)?.value;
    const kieg1add:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '1')?.value;
    const kieg2add:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '2')?.value;
    const kieg3add:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '3')?.value;
    const kieg1multi:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '1')?.value;
    const kieg2multi:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '2')?.value;
    const kieg3multi:number = ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '3')?.value;
    const total = Math.round(armor*kieg1multi*kieg2multi*kieg3multi+kieg1add+kieg2add+kieg3add);
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('armorTotal'+tag)?.patchValue(total);
    return total;
  }

  AddAddon(i:number, type:string, tag: number) {
    this.modalService.openModal(ArmorAddonslistModalComponent, {kiegFilter: this.getLegends(type)}).subscribe(
      w => this.onAddAddon(w, i, type, tag));
  }

  onAddAddon(id:string, i:number, type:string, tag:number) {
    if (id == 'none') {
      return;
    }
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonName'+tag)?.patchValue(
      this.armorAddonServ.armorAddonsList.filter(x=>x.id == id).map(x=>x.addonName)[0]
    );
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonAddPrice'+tag)?.patchValue(
      this.armorAddonServ.armorAddonsList.filter(x=>x.id == id).map(x=>x.addonAddPrice)[0]
    );
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonAddWeight'+tag)?.patchValue(
      this.armorAddonServ.armorAddonsList.filter(x=>x.id == id).map(x=>x.addonAddWeight)[0]
    );
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonMultiPrice'+tag)?.patchValue(
      this.armorAddonServ.armorAddonsList.filter(x=>x.id == id).map(x=>x.addonMultiPrice)[0]
    );
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonMultiWeight'+tag)?.patchValue(
      this.armorAddonServ.armorAddonsList.filter(x=>x.id == id).map(x=>x.addonMultiWeight)[0]
    );
    ((this.armorsForm.get(type) as FormArray).at(i) as FormGroup).get('addonDesc'+tag)?.patchValue(
      this.armorAddonServ.armorAddonsList.filter(x=>x.id == id).map(x=>x.addonDesc)[0]
    );
  }

  getSum(tag:string):number | null {
    const helms:number = (this.armorsForm.get('helms') as FormArray).value.reduce((prev: number, next:number) => prev + +next['armorTotal'+tag], 0);
    const armors:number = (this.armorsForm.get('armors') as FormArray).value.reduce((prev: number, next:number) => prev + +next['armorTotal'+tag], 0);
    const shields:number = (this.armorsForm.get('shields') as FormArray).value.reduce((prev: number, next:number) => prev + +next['armorTotal'+tag], 0);
    const total = helms + armors + shields;
    return total;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.armorServ.getArmors().subscribe({
      next: (w) => {
        this.armorServ.armorsList = w;
      }
    });
    this.armorAddonServ.getAddons().subscribe({
      next: (w) => {
        this.armorAddonServ.armorAddonsList = w;
      }
    });
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
