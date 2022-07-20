import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentsService } from '../equipments/equipments.service';

@Component({
  selector: 'app-equipmentslist',
  templateUrl: './equipmentslist.component.html',
  styleUrls: ['./equipmentslist.component.css']
})
export class EquipmentslistComponent implements OnInit {

  constructor(
    public equipsServ: EquipmentsService,
    private router: Router,
  ) { }

  @Output() onEquipmentSelected = new EventEmitter<string>();

  @Input() selectionMode: boolean = false;
  sortMeFilter: string = 'none';

  public weaponId:string = '';

  sortMeBy(categ: string):void {
    this.sortMeFilter = categ;
  }

  public equipmentId:string = '';

  getEquipmentCats(): Array<any> | null {
    const categs = [...new Set(this.equipsServ.equipmentsList.map(x=> x.equipmentCategory))];
    return categs;
  }

  getEquipmentCatsFiltered(): Array<any> | null {
    if(this.sortMeFilter == 'none') {
      let categs = [...new Set(this.equipsServ.equipmentsList.map(x=> x.equipmentCategory))];
      return categs;
    }
    let categs = [...new Set(this.equipsServ.equipmentsList.filter(x=>x.equipmentCategory == this.sortMeFilter).map(x=>x.equipmentCategory))];
    return categs;
  }


  getEquipments(categ: string): Array<any> | null {
    const filteredequipment = this.equipsServ.equipmentsList.filter(x => x.equipmentCategory == categ);
    return filteredequipment;
  }

  sendEquipmentID(id: string) {
    this.onEquipmentSelected.next(id);
  }

  gotoNewEquipment() {
    (<any>this.router).navigate(["/newequipment"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/equipmentedit/"+id]);
  }

  ngOnInit():void {
    this.equipsServ.getEquipments().subscribe({
      next: (w) => {
        this.equipsServ.equipmentsList = w;
      }
    });
  }

}
