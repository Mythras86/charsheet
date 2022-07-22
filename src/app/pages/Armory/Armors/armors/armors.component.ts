import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from 'src/app/pages/charsheets/char.fgconfing';
import { Armors } from './armors.model';
import { ArmorsService } from './armors.service';

@Component({
  selector: 'app-armors',
  templateUrl: './armors.component.html',
  styleUrls: ['./armors.component.css']
})
export class ArmorsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public armorServ: ArmorsService
    ) { }

  public newArmorForm!: FormGroup;

  public mode:string = 'create';
  public armorId: string = '';

  newArmor() {
    const newArmor: FormGroupConfig<Armors> = {
      id: ['', {value: '', disabled: false}],
      armorName: ['', {value: '', disabled: false}],
      armorCategory: ['', {value: '', disabled: false}],
      armorRating: [0, {value: 0, disabled: false}],
      armorWeight: [0, {value: 0, disabled: false}],
      armorPrice: [0, {value: 0, disabled: false}],
      armorDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newArmor);
  }

  createNewArmor() {
    var form = this.newArmorForm;
    if (form.invalid) {
      return;
    }
    this.armorServ.addOneArmor(
      form.value.armorName,
      form.value.armorCategory,
      form.value.armorRating,
      form.value.armorWeight,
      form.value.armorPrice,
      form.value.armorDesc
      );
  }

  onSubmit() {
    var form = this.newArmorForm;
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.armorServ.addOneArmor(
        form.value.armorName,
        form.value.armorCategory,
        form.value.armorRating,
        form.value.armorWeight,
        form.value.armorPrice,
        form.value.armorDesc
        );
    } else {
      this.armorServ.updateOneArmor(
        this.armorId,
        form.value.armorName,
        form.value.armorCategory,
        form.value.armorRating,
        form.value.armorWeight,
        form.value.armorPrice,
        form.value.armorDesc
        );
      }
      this.router.navigate(["/armorslist"]);
    }

    backToList() {
      this.router.navigate(["/armorslist"]);
    }

  ngOnInit(): void {
    this.newArmorForm = this.newArmor();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.armorId = paramMap.get('id');
        this.armorServ.getOneArmor(this.armorId).subscribe(armorData => {
          this.newArmorForm = this.fb.group({
            id: armorData._id,
            armorName: armorData.armorName,
            armorCategory: armorData.armorCategory,
            armorRating: armorData.armorRating,
            armorWeight: armorData.armorWeight,
            armorPrice: armorData.armorPrice,
            armorDesc: armorData.armorDesc,
          });
          this.newArmorForm.patchValue({
            armorName: this.newArmorForm.get('armorName')?.value,
            armorCategory: this.newArmorForm.get('armorCategory')?.value,
            armorRating: this.newArmorForm.get('armorRating')?.value,
            armorWeight: this.newArmorForm.get('armorWeight')?.value,
            armorPrice: this.newArmorForm.get('armorPrice')?.value,
            armorDesc: this.newArmorForm.get('armorDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.armorId = '';
      }
    });
  }


}
