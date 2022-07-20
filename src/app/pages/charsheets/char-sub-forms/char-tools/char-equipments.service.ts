import { Injectable } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { EquipmentsService } from 'src/app/pages/Armory/Equipment/equipments/equipments.service';

@Injectable({
  providedIn: 'root'
})
export class CharEquipmentsService {

  constructor(
    private fb: FormBuilder,
    public equipServ: EquipmentsService,
  ) { }

  public selectedEquipID: Subject<string> = new Subject;

  addEquipment(id: string) {
    const toolsForm = this.fb.group({
    equipmentName: this.equipServ.equipmentsList.filter(x=>x.id == id).map(x=>x.equipmentName)[0],
    equipmentCategory: this.equipServ.equipmentsList.filter(x=>x.id == id).map(x=>x.equipmentCategory)[0],
    equipmentWeight: this.equipServ.equipmentsList.filter(x=>x.id == id).map(x=>x.equipmentWeight)[0],
    equipmentPrice: this.equipServ.equipmentsList.filter(x=>x.id == id).map(x=>x.equipmentPrice)[0],
    equipmentDesc: this.equipServ.equipmentsList.filter(x=>x.id == id).map(x=>x.equipmentDesc)[0],
    equipmentCount: [1, {value: 1, disabled: false}],
    equipmentLevel: this.equipServ.equipmentsList.filter(x=>x.id == id).map(x=>x.equipmentLevel)[0],
    equipmentTotalPrice: [0, {value: 0, disabled: false}],
    equipmentTotalWeight: [0, {value: 0, disabled: false}],
    });
    return toolsForm;
  }

  onEquipmentSelected(id: string) {
    this.selectedEquipID.next(id);
  }
}
