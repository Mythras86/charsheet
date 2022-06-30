import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from 'src/app/pages/charsheets/char.fgconfing';
import { ArmorAddons } from './armor-addons.model';
import { ArmorAddonsService } from './armor-addons.service';

@Component({
  selector: 'app-armor-addons',
  templateUrl: './armor-addons.component.html',
  styleUrls: ['./armor-addons.component.css']
})
export class ArmorAddonsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private addonServ: ArmorAddonsService,
    public router: Router
    ) { }

  public armorAddonsForm!: FormGroup;

  public mode:string = 'create';
  public armorAddonId: string = '';

  newAddon() {
    const newAddon: FormGroupConfig<ArmorAddons> = {
      id: ['', {value: '', disabled: false}],
      addonName: ['', {value: '', disabled: false}],
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
    var form = this.armorAddonsForm;
    if (form.invalid) {
      return;
    }
    this.addonServ.addOneAddon(
      form.value.addonName,
      form.value.addonPlace,
      form.value.addonAddWeight,
      form.value.addonAddPrice,
      form.value.addonMultiWeight,
      form.value.addonMultiPrice,
      form.value.addonDesc,
      );
  }

  onSubmit() {
    var form = this.armorAddonsForm;
     if (form.invalid) {
       return;
     }
     if (this.mode === 'create') {
       this.addonServ.addOneAddon(
         form.value.addonName,
         form.value.addonPlace,
         form.value.addonAddWeight,
         form.value.addonAddPrice,
         form.value.addonMultiWeight,
         form.value.addonMultiPrice,
         form.value.addonDesc,
         );
     } else {
       this.addonServ.updateOneAddon(
         this.armorAddonId,
         form.value.addonName,
         form.value.addonPlace,
         form.value.addonAddWeight,
         form.value.addonAddPrice,
         form.value.addonMultiWeight,
         form.value.addonMultiPrice,
         form.value.addonDesc,
         );
     }
     this.armorAddonsForm.reset();
  }

  backToList() {
    this.router.navigate(["/armoraddonslist"]);
  }

  ngOnInit(): void {
    this.armorAddonsForm = this.newAddon();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.armorAddonId = paramMap.get('id')!;
        this.addonServ.getOneAddon(this.armorAddonId).subscribe(addonData => {
          this.armorAddonsForm = this.fb.group({
            id: addonData._id,
            addonName: addonData.addonName,
            addonPlace: addonData.addonPlace,
            addonAddWeight: addonData.addonAddWeight,
            addonAddPrice: addonData.addonAddPrice,
            addonMultiWeight: addonData.addonMultiWeight,
            addonMultiPrice: addonData.addonMultiPrice,
            addonDesc: addonData.addonDesc,
          });
          this.armorAddonsForm.patchValue({
            addonName: this.armorAddonsForm.get('addonName')?.value,
            addonPlace: this.armorAddonsForm.get('addonPlace')?.value,
            addonAddWeight: this.armorAddonsForm.get('addonAddWeight')?.value,
            addonAddPrice: this.armorAddonsForm.get('addonAddPrice')?.value,
            addonMultiWeight: this.armorAddonsForm.get('addonMultiWeight')?.value,
            addonMultiPrice: this.armorAddonsForm.get('addonMultiPrice')?.value,
            addonDesc:  this.armorAddonsForm.get('addonDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.armorAddonId = '';
      }
    });
  }

}
