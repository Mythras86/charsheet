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

  get weapons(): Array<any> | null {
    return this.weaponsServ.weaponslist;
  }

  gotoNewWeapon() {
    (<any>this.router).navigate(["/newweapon"]);
  }

  ngOnInit():void {
    this.weaponsServ.getWeapons();
  }

}
