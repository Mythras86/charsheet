import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { FormGroupConfig } from '../../../char.fgconfing';
import { Weapons } from '../weapons.model';
import { WeaponsService } from '../weapons.service';

@Component({
  selector: 'app-char-new-weapon',
  templateUrl: './char-new-weapon.component.html',
  styleUrls: ['./char-new-weapon.component.css']
})
export class CharNewWeaponComponent implements OnInit {

  public newWeaponForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    public weapServ: WeaponsService,
    private router: Router
  ) { }

  createNewWeapon() {
    var form = this.newWeaponForm;
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.weapServ.addOneWeapon(
      form.value.weaponName,
      form.value.weaponType,
      form.value.weaponRange,
      form.value.weaponPower,
      form.value.weaponDamage,
      form.value.weaponWeight,
      form.value.weaponPrice,
      form.value.weaponDesc
      );
  }

  newWeapon() {
    const newWeapon: FormGroupConfig<Weapons> = {
      weaponName: ['', {value: '', disabled: false}],
      weaponType: ['', {value: '', disabled: false}],
      weaponRange: [0, {value: 0, disabled: false}],
      weaponPower: [0, {value: 0, disabled: false}],
      weaponDamage: [0, {value: 0, disabled: false}],
      weaponWeight: [0, {value: 0, disabled: false}],
      weaponPrice: [0, {value: 0, disabled: false}],
      weaponDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newWeapon);
  }

  onSubmit() {
    var form = this.newWeaponForm;
    if (form.invalid) {
      return;
    }
    this.weapServ.addOneWeapon(
      form.value.weaponName,
      form.value.weaponType,
      form.value.weaponRange,
      form.value.weaponPower,
      form.value.weaponDamage,
      form.value.weaponWeight,
      form.value.weaponPrice,
      form.value.weaponDesc
    );
  }

  ngOnInit(): void {
    this.newWeaponForm = this.newWeapon();
  }

}
