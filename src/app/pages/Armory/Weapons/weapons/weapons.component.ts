import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from '../../../charsheets/char.fgconfing';
import { Weapons } from './weapons.model';
import { WeaponsService } from './weapons.service';

@Component({
  selector: 'app-weapons',
  templateUrl: './weapons.component.html',
  styleUrls: ['./weapons.component.css']
})
export class WeaponsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public weapServ: WeaponsService,
    public route: ActivatedRoute,
    public router: Router
    ) { }

  public newWeaponForm!: FormGroup;

  public mode:string = 'create';
  public weaponId: string = '';

  newWeapon() {
    const newWeapon: FormGroupConfig<Weapons> = {
      id: ['', {value: '', disabled: false}],
      weaponName: ['', {value: '', disabled: false}],
      weaponCategory: ['', {value: '', disabled: false}],
      weaponType: ['', {value: '', disabled: false}],
      weaponClip: ['', {value: '', disabled: false}],
      weaponMods: ['', {value: '', disabled: false}],
      weaponRange: [0, {value: 0, disabled: false}],
      weaponPower: [0, {value: 0, disabled: false}],
      weaponDamage: [0, {value: 0, disabled: false}],
      weaponDmgType: ['', {value: '', disabled: false}],
      weaponWeight: [0, {value: 0, disabled: false}],
      weaponPrice: [0, {value: 0, disabled: false}],
      weaponDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newWeapon);
  }

  createNewWeapon() {
    var form = this.newWeaponForm;
    if (form.invalid) {
      return;
    }
    this.weapServ.addOneWeapon(
      form.value.weaponName,
      form.value.weaponCategory,
      form.value.weaponType,
      form.value.weaponClip,
      form.value.weaponMods,
      form.value.weaponRange,
      form.value.weaponPower,
      form.value.weaponDamage,
      form.value.weaponDmgType,
      form.value.weaponWeight,
      form.value.weaponPrice,
      form.value.weaponDesc
      );
  }

  onSubmit() {
    var form = this.newWeaponForm;
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.weapServ.addOneWeapon(
        form.value.weaponName,
        form.value.weaponCategory,
        form.value.weaponType,
        form.value.weaponClip,
        form.value.weaponMods,
        form.value.weaponRange,
        form.value.weaponPower,
        form.value.weaponDamage,
        form.value.weaponDmgType,
        form.value.weaponWeight,
        form.value.weaponPrice,
        form.value.weaponDesc
      );
    } else {
      this.weapServ.updateOneWeapon(
        this.weaponId,
        form.value.weaponName,
        form.value.weaponCategory,
        form.value.weaponType,
        form.value.weaponClip,
        form.value.weaponMods,
        form.value.weaponRange,
        form.value.weaponPower,
        form.value.weaponDamage,
        form.value.weaponDmgType,
        form.value.weaponWeight,
        form.value.weaponPrice,
        form.value.weaponDesc
      );
    }
    this.router.navigate(["/weaponslist"]);
  }

  ngOnInit(): void {
    this.newWeaponForm = this.newWeapon();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('weaponId')) {
        this.mode = 'edit';
        this.weaponId = paramMap.get('weaponId')!;
        this.weapServ.getOneWeapon(this.weaponId).subscribe(weaponData => {
          this.newWeaponForm = this.fb.group({
            id: weaponData._id,
            weaponName: weaponData.weaponName,
            weaponCategory: weaponData.weaponCategory,
            weaponType: weaponData.weaponType,
            weaponClip: weaponData.weaponClip,
            weaponMods: weaponData.weaponMods,
            weaponRange: weaponData.weaponRange,
            weaponPower: weaponData.weaponPower,
            weaponDamage: weaponData.weaponDamage,
            weaponDmgType: weaponData.weaponDmgType,
            weaponWeight: weaponData.weaponWeight,
            weaponPrice: weaponData.weaponPrice,
            weaponDesc: weaponData.weaponDesc,
          });
          this.newWeaponForm.patchValue({
            weaponName: this.newWeaponForm.get('weaponName')?.value,
            weaponCategory: this.newWeaponForm.get('weaponCategory')?.value,
            weaponType: this.newWeaponForm.get('weaponType')?.value,
            weaponClip: this.newWeaponForm.get('weaponClip')?.value,
            weaponMods: this.newWeaponForm.get('weaponMods')?.value,
            weaponRange:  this.newWeaponForm.get('weaponRange')?.value,
            weaponPower: this.newWeaponForm.get('weaponPower')?.value,
            weaponDamage: this.newWeaponForm.get('weaponDamage')?.value,
            weaponDmgType: this.newWeaponForm.get('weaponDmgType')?.value,
            weaponWeight: this.newWeaponForm.get('weaponWeight')?.value,
            weaponPrice: this.newWeaponForm.get('weaponPrice')?.value,
            weaponDesc: this.newWeaponForm.get('weaponDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.weaponId = '';
      }
    });

  }

  backToList() {
    this.router.navigate(["/weaponslist"]);
  }

}
