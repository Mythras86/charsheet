import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddonsService } from '../weapon-addons/weapon-addons.service';

@Component({
  selector: 'app-weapon-addonslist',
  templateUrl: './weapon-addonslist.component.html',
  styleUrls: ['./weapon-addonslist.component.css']
})
export class WeaponAddonslistComponent implements OnInit {

  constructor(
    public addonServ: AddonsService,
    private router: Router
  ) { }

  getAddons(): Array<any> | null {
    return this.addonServ.addonslist;
  }

  gotoNewAddon() {
    (<any>this.router).navigate(["/newaddon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/edit/"+id]);
  }

  ngOnInit(): void {
    this.addonServ.getAddons();
  }

}
