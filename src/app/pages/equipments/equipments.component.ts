import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeaponsService } from '../charsheets/char-sub-forms/char-weapons/weapons.service';

@Component({
  selector: 'app-equipments',
  templateUrl: './equipments.component.html',
  styleUrls: ['./equipments.component.css']
})
export class EquipmentsComponent implements OnInit {

  constructor(
    public weaponsServ: WeaponsService,
    private router: Router,
  ) { }

  public weaponId!:string;

  getWeapons(type: string): Array<any> | null {
    return this.weaponsServ.weaponslist.filter(x => x.weaponType == type);
  }

  gotoNewWeapon() {
    (<any>this.router).navigate(["/newweapon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/edit/"+id]);
  }

  getWeaponCats():Array<any> | null {
    const categs = [...new Set(this.weaponsServ.weaponslist.map(x => x.weaponCategory))];
    return categs;
  }

  getWeaponTypes():Array<any> | null {
    const types = [...new Set(this.weaponsServ.weaponslist.map(x => x.weaponType))];
    return types;
  }

  ngOnInit():void {
    this.weaponsServ.getWeapons();
  }

}
