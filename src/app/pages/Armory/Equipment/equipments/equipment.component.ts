import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from 'src/app/pages/charsheets/char.fgconfing';
import { Equipments } from './equipments.model';
import { EquipmentsService } from './equipments.service';

@Component({
  selector: 'app-equipment',
  templateUrl: './equipment.component.html',
  styleUrls: ['./equipment.component.css']
})
export class EquipmentComponent implements OnInit {


  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public equipServ: EquipmentsService
    ) { }

  public newEquipmentForm!: FormGroup;

  public mode:string = 'create';
  public equipmentId: string = '';

  newEquipment() {
    const newEquipment: FormGroupConfig<Equipments> = {
      id: ['', {value: '', disabled: false}],
      equipmentName: ['', {value: '', disabled: false}],
      equipmentCategory: ['', {value: '', disabled: false}],
      equipmentMaxLevel: [1, {value: 1, disabled: false}],
      equipmentWeight: [0, {value: 0, disabled: false}],
      equipmentPrice: [0, {value: 0, disabled: false}],
      equipmentDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newEquipment);
  }

  createNewEquipment() {
    var form = this.newEquipmentForm;
    if (form.invalid) {
      return;
    }
    this.equipServ.addOneEquipment(
      form.value.equipmentName,
      form.value.equipmentCategory,
      form.value.equipmentMaxLevel,
      form.value.equipmentWeight,
      form.value.equipmentPrice,
      form.value.equipmentDesc
      );
  }

  onSubmit() {
    var form = this.newEquipmentForm;
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.equipServ.addOneEquipment(
        form.value.equipmentName,
        form.value.equipmentCategory,
        form.value.equipmentMaxLevel,
        form.value.equipmentWeight,
        form.value.equipmentPrice,
        form.value.equipmentDesc
        );
    } else {
      this.equipServ.updateOneEquipment(
        this.equipmentId,
        form.value.equipmentName,
        form.value.equipmentCategory,
        form.value.equipmentMaxLevel,
        form.value.equipmentWeight,
        form.value.equipmentPrice,
        form.value.equipmentDesc
        );
      }
      this.router.navigate(["/equipmentslist"]);
    }

    backToList() {
      this.router.navigate(["/equipmentslist"]);
    }

  ngOnInit(): void {
    this.newEquipmentForm = this.newEquipment();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.equipmentId = paramMap.get('id')!;
        this.equipServ.getOneEquipment(this.equipmentId).subscribe(equipmentData => {
          this.newEquipmentForm = this.fb.group({
            id: equipmentData._id,
            equipmentName: equipmentData.equipmentName,
            equipmentCategory: equipmentData.equipmentCategory,
            equipmentMaxLevel: equipmentData.equipmentMaxLevel,
            equipmentWeight: equipmentData.equipmentWeight,
            equipmentPrice: equipmentData.equipmentPrice,
            equipmentDesc: equipmentData.equipmentDesc,
          });
          this.newEquipmentForm.patchValue({
            equipmentName: this.newEquipmentForm.get('equipmentName')?.value,
            equipmentCategory: this.newEquipmentForm.get('equipmentCategory')?.value,
            equipmentMaxLevel: this.newEquipmentForm.get('equipmentMaxLevel')?.value,
            equipmentWeight: this.newEquipmentForm.get('equipmentWeight')?.value,
            equipmentPrice: this.newEquipmentForm.get('equipmentPrice')?.value,
            equipmentDesc: this.newEquipmentForm.get('equipmentDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.equipmentId = '';
      }
    });
  }


}
