import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from '../../../char.fgconfing';
import { Addons } from './weapon-addons.model';
import { AddonsService } from './weapon-addons.service';

@Component({
  selector: 'app-char-addon-addons',
  templateUrl: './char-weapon-addons.component.html',
  styleUrls: ['./char-weapon-addons.component.css']
})
export class CharWeaponAddonsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    private addonServ: AddonsService,
    public router: Router
    ) { }

  public addonForm!: FormGroup;

  public mode:string = 'create';
  public addonId: string = '';

  newAddon() {
    const newAddon: FormGroupConfig<Addons> = {
      id: ['', {value: '', disabled: false}],
      addonName: ['', {value: '', disabled: false}],
      addonCategory: ['', {value: '', disabled: false}],
      addonPlace: ['', {value: '', disabled: false}],
      addonWeight: [0, {value: 0, disabled: false}],
      addonPrice: [0, {value: 0, disabled: false}],
      addonDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newAddon);
  }

  createNewAddon() {
    var form = this.addonForm;
    if (form.invalid) {
      return;
    }
    this.addonServ.addOneAddon(
      form.value.addonName,
      form.value.addonCategory,
      form.value.addonPlace,
      form.value.addonWeight,
      form.value.addonPrice,
      form.value.addonDesc,
      );
  }

  onSubmit() {
     var form = this.addonForm;
     if (form.invalid) {
       return;
     }
     if (this.mode === 'create') {
       this.addonServ.addOneAddon(
         form.value.addonName,
         form.value.addonCategory,
         form.value.addonPlace,
         form.value.addonWeight,
         form.value.addonPrice,
         form.value.addonDesc,
         );
     } else {
       this.addonServ.updateOneAddon(
         this.addonId,
         form.value.addonName,
         form.value.addonCategory,
         form.value.addonPlace,
         form.value.addonWeight,
         form.value.addonPrice,
         form.value.addonDesc,
         );
     }
     this.addonForm.reset();
  }

  ngOnInit(): void {
    this.addonForm = this.newAddon();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('addonId')) {
        this.mode = 'edit';
        this.addonId = paramMap.get('addonId')!;
        this.addonServ.getOneAddon(this.addonId).subscribe(addonData => {
          this.addonForm = this.fb.group({
            id: addonData._id,
            addonName: addonData.addonName,
            addonCategory: addonData.addonCategory,
            addonPlace: addonData.addonPlace,
            addonWeight: addonData.addonWeight,
            addonPrice: addonData.addonPrice,
            addonDesc: addonData.addonDesc,
          });
          this.addonForm.patchValue({
            addonName: this.addonForm.get('addonName')?.value,
            addonCategory: this.addonForm.get('addonCategory')?.value,
            addonPlace: this.addonForm.get('addonPlace')?.value,
            addonWeight: this.addonForm.get('addonWeight')?.value,
            addonPrice: this.addonForm.get('addonPrice')?.value,
            addonDesc:  this.addonForm.get('addonDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.addonId = '';
      }
    });

  }

  backToList() {
    this.router.navigate(["/equipments"]);
  }


}
