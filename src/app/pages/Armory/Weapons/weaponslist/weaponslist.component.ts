import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeaponsService } from '../weapons/weapons.service';

@Component({
  selector: 'app-weaponslist',
  templateUrl: './weaponslist.component.html',
  styleUrls: ['./weaponslist.component.css']
})
export class WeaponsListComponent implements OnInit {

  constructor(
    public weaponsServ: WeaponsService,
    private router: Router,
  ) { }

  public weaponId!:string;

  getWeapons(type: string): Array<any> | null {
    return this.weaponsServ.weaponslist.filter((x: { weaponType: string; }) => x.weaponType == type);
  }

  gotoNewWeapon() {
    (<any>this.router).navigate(["/newweapon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/edit/"+id]);
  }

  getWeaponCats():Array<any> | null {
    const categs = [...new Set(this.weaponsServ.weaponslist.map((x: { weaponCategory: string; }) => x.weaponCategory))];
    return categs;
  }

  getWeaponTypes(categs: string):Array<any> | null {
    const types = [...new Set(this.weaponsServ.weaponslist.filter((x: { weaponCategory: string; }) => x.weaponCategory == categs).map((x: { weaponType: any; }) => x.weaponType))];
    return types;
  }

  ngOnInit():void {
    this.weaponsServ.getWeapons();
  }

}
