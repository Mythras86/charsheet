import { Component, OnInit, Input, AfterContentChecked, ChangeDetectorRef } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { WeaponsService } from 'src/app/pages/Armory/Weapons/weapons/weapons.service';
import { WeaponAddonsService } from 'src/app/pages/Armory/Weapons/weapon-addons/weapon-addons.service';
import { ResourcesService } from '../char-resources/resources.service';
import { CharWeaponsService } from './char-weapons.service';
import { ModalService } from 'src/app/modals/modal.service';
import { WeaponslistModalComponent } from 'src/app/modals/weaponslist-modal/weaponslist-modal.component';
import { AddonslistModalComponent } from 'src/app/modals/weaponaddonslist-modal/weaponaddonslist-modal.component';
import { CharExplosivesService } from './char-explosives.service';
import { CharEquipmentsService } from './char-equipments.service';
import { CharWeaponAddonsService } from './char-weapon-addons.service';
import { EquipmentslistModalComponent } from 'src/app/modals/equipmentslist-modal/equipmentslist-modal.component';

@Component({
  selector: 'app-char-tools',
  templateUrl: './char-tools.component.html',
  styleUrls: ['./char-tools.component.css']
})
export class CharToolsComponent implements OnInit, AfterContentChecked {

  @Input() toolsForm!: FormGroup

  constructor(
    private changeDetector: ChangeDetectorRef,
    public weapServ: WeaponsService,
    public addonServ: WeaponAddonsService,
    public resServ: ResourcesService,
    public charWeaponsServ: CharWeaponsService,
    public charExploServ: CharExplosivesService,
    public charEquipServ: CharEquipmentsService,
    public charWeaponAddonServ: CharWeaponAddonsService,
    private modalService: ModalService,
    ) { }

  public yourMoney:number = 0;
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }

  public get weapons(): FormArray | null {
    if(!this.toolsForm) {
      return null;
    }
    return this.toolsForm.controls.weapons as FormArray;
  }

  public get explosives(): FormArray | null {
    if(!this.toolsForm) {
      return null;
    }
    return this.toolsForm.controls.explosives as FormArray;
  }

  public get equipments(): FormArray | null {
    if(!this.toolsForm) {
      return null;
    }
    return this.toolsForm.controls.equipments as FormArray;
  }

  getFormcontrol(i: number, arrayname: string, controlname:string) {
    let fc = ((this.toolsForm.get(arrayname) as FormArray).at(i) as FormGroup).get(controlname);
    return fc;
  }

  addNewTool(faName: string):void {
    if(faName == 'weapons') {
      this.modalService.openModal(WeaponslistModalComponent, {sortMeFilter: 'none'}).subscribe(w => this.onAddNewTool(w, faName));
    }
    if(faName == 'explosives') {
      this.modalService.openModal(WeaponslistModalComponent, {sortMeFilter: 'Robbanóanyagok'}).subscribe(w => this.onAddNewTool(w, faName));
    }
    if(faName == 'equipments') {
      this.modalService.openModal(EquipmentslistModalComponent, null).subscribe(w => this.onAddNewTool(w, faName));
    }
  }

  onAddNewTool(id: string, faName:string) {
    if (id == 'none') {
      return;
    }
    if(faName == 'weapons') {
      this.weapons?.push(this.charWeaponsServ.addWeapon(id));
    }
    if(faName == 'explosives') {
      this.explosives.push(this.charExploServ.addExplosive(id));
    }
    if(faName == 'equipments') {
      this.equipments.push(this.charEquipServ.addEquipment(id));
    }
  }

  AddAddon(i:number, tag:number, categ:string) {
    if (categ == 'Nehézfegyverek') {
      this.modalService.openModal(AddonslistModalComponent, {kiegFilter: 'kieg'+tag, categFilter: 'Tűzfegyverek'}).subscribe(w => this.onAddAddon(w, i, tag));
    }
    this.modalService.openModal(AddonslistModalComponent, {kiegFilter: 'kieg'+tag, categFilter: categ}).subscribe(w => this.onAddAddon(w, i, tag));
  }

  onAddAddon(id:string, i:number, tag:number) {
    if (id == 'none') {
      return;
    }
    this.charWeaponAddonServ.addAddon(id, i, tag, this.toolsForm)
  }
  removeTool(i:number, faName:string): void {
    (this.toolsForm.get(faName) as FormArray).removeAt(i);
  }

  getDetails(i: number, fckey: string, faName: string):any {
    let detail = ((this.toolsForm.get(faName) as FormArray).at(i) as FormGroup).get(fckey)?.value;
    return detail;
  }

  getWeapSubTotal(i:number, tag:string):number {
    const weapon = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('weapon' +tag)?.value;
    const kieg1add = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '1')?.value;
    const kieg2add = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '2')?.value;
    const kieg3add = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '3')?.value;
    const kieg4add = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonAdd' + tag + '4')?.value;
    const kieg1multi = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '1')?.value;
    const kieg2multi = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '2')?.value;
    const kieg3multi = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '3')?.value;
    const kieg4multi = ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('addonMulti' + tag + '4')?.value;
    const total = Math.round((weapon*kieg1multi*kieg2multi*kieg3multi*kieg4multi+kieg1add+kieg2add+kieg3add+kieg4add+ Number.EPSILON) * 100) / 100;
    ((this.toolsForm.get('weapons') as FormArray).at(i) as FormGroup).get('weaponTotal'+tag)?.patchValue(total);
    if (tag == 'Price') {
      return Math.round(total);
    }
    return total ;
  }

  getExpoSubTotal(i: number, tag:string):number {
    const weapon = ((this.toolsForm.get('explosives') as FormArray).at(i) as FormGroup).get('weapon' +tag)?.value;
    const count = ((this.toolsForm.get('explosives') as FormArray).at(i) as FormGroup).get('weaponCount')?.value;
    const total = Math.round((weapon * count + Number.EPSILON) * 100) / 100;
    ((this.toolsForm.get('explosives') as FormArray).at(i) as FormGroup).get('weaponTotal'+tag)?.patchValue(total);
    if (tag == 'Price') {
      return Math.round(total);
    }
    return total;
  }

  getEquipSubTotal(i: number, tag:string):number {
    const equip = ((this.toolsForm.get('equipments') as FormArray).at(i) as FormGroup).get('equipment' +tag)?.value;
    const count = ((this.toolsForm.get('equipments') as FormArray).at(i) as FormGroup).get('equipmentCount')?.value;
    const level = ((this.toolsForm.get('equipments') as FormArray).at(i) as FormGroup).get('equipmentLevel')?.value;
    const total = Math.round((equip * count * level + Number.EPSILON) * 100) / 100;
    ((this.toolsForm.get('equipments') as FormArray).at(i) as FormGroup).get('equipmentTotal'+tag)?.patchValue(total);
    if (tag == 'Price') {
      return Math.round(total);
    }
    return total;
  }

  getSum(tag:string):number | null {
    const weapons = (this.toolsForm.get('weapons') as FormArray).value.reduce((prev: number, next:number) => prev + +next['weaponTotal'+tag], 0);
    const explosives = (this.toolsForm.get('explosives') as FormArray).value.reduce((prev: number, next:number) => prev + +next['weaponTotal'+tag], 0);
    const equips = (this.toolsForm.get('equipments') as FormArray).value.reduce((prev: number, next:number) => prev + +next['equipmentTotal'+tag], 0);
    const total = weapons + explosives + equips;
    if (tag == 'Price') {
      return Math.round(total);
    }
    return Math.round((total + Number.EPSILON) * 100) / 100;
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
