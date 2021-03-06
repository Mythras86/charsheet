import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from 'src/app/pages/charsheets/char.fgconfing';
import { WeaponAddons } from './weapon-addons.model';
import { WeaponAddonsService } from './weapon-addons.service';

@Component({
  selector: 'app-weapon-addons',
  templateUrl: './weapon-addons.component.html',
  styleUrls: ['./weapon-addons.component.css']
})
export class WeaponAddonsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private addonServ: WeaponAddonsService,
    public router: Router
    ) { }

  public weaponAddonsForm!: FormGroup;

  public mode:string = 'create';
  public weaponAddonId: string = '';

  newAddon() {
    const newAddon: FormGroupConfig<WeaponAddons> = {
      id: ['', {value: '', disabled: false}],
      addonName: ['', {value: '', disabled: false}],
      addonCategory: ['', {value: '', disabled: false}],
      addonPlace: ['', {value: '', disabled: false}],
      addonAddWeight: [0, {value: 0, disabled: false}],
      addonAddPrice: [0, {value: 0, disabled: false}],
      addonMultiWeight: [1, {value: 1, disabled: false}],
      addonMultiPrice: [1, {value: 1, disabled: false}],
      addonDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newAddon);
  }

  createNewAddon() {
    var form = this.weaponAddonsForm;
    if (form.invalid) {
      return;
    }
    this.addonServ.addOneAddon(
      form.value.addonName,
      form.value.addonCategory,
      form.value.addonPlace,
      form.value.addonAddWeight,
      form.value.addonAddPrice,
      form.value.addonMultiWeight,
      form.value.addonMultiPrice,
      form.value.addonDesc,
      );
  }

  onSubmit() {
    var form = this.weaponAddonsForm;
     if (form.invalid) {
       return;
     }
     if (this.mode === 'create') {
       this.addonServ.addOneAddon(
         form.value.addonName,
         form.value.addonCategory,
         form.value.addonPlace,
         form.value.addonAddWeight,
         form.value.addonAddPrice,
         form.value.addonMultiWeight,
         form.value.addonMultiPrice,
         form.value.addonDesc,
         );
     } else {
       this.addonServ.updateOneAddon(
         this.weaponAddonId,
         form.value.addonName,
         form.value.addonCategory,
         form.value.addonPlace,
         form.value.addonAddWeight,
         form.value.addonAddPrice,
         form.value.addonMultiWeight,
         form.value.addonMultiPrice,
         form.value.addonDesc,
         );
     }
     this.weaponAddonsForm.reset();
  }

  backToList() {
    this.router.navigate(["/weaponaddonslist"]);
  }

  ngOnInit(): void {
    this.weaponAddonsForm = this.newAddon();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.weaponAddonId = paramMap.get('id')!;
        this.addonServ.getOneAddon(this.weaponAddonId).subscribe(addonData => {
          this.weaponAddonsForm = this.fb.group({
            id: addonData._id,
            addonName: addonData.addonName,
            addonCategory: addonData.addonCategory,
            addonPlace: addonData.addonPlace,
            addonAddWeight: addonData.addonAddWeight,
            addonAddPrice: addonData.addonAddPrice,
            addonMultiWeight: addonData.addonMultiWeight,
            addonMultiPrice: addonData.addonMultiPrice,
            addonDesc: addonData.addonDesc,
          });
          this.weaponAddonsForm.patchValue({
            addonName: this.weaponAddonsForm.get('addonName')?.value,
            addonCategory: this.weaponAddonsForm.get('addonCategory')?.value,
            addonPlace: this.weaponAddonsForm.get('addonPlace')?.value,
            addonAddWeight: this.weaponAddonsForm.get('addonAddWeight')?.value,
            addonAddPrice: this.weaponAddonsForm.get('addonAddPrice')?.value,
            addonMultiWeight: this.weaponAddonsForm.get('addonMultiWeight')?.value,
            addonMultiPrice: this.weaponAddonsForm.get('addonMultiPrice')?.value,
            addonDesc:  this.weaponAddonsForm.get('addonDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.weaponAddonId = '';
      }
    });
  }

}
