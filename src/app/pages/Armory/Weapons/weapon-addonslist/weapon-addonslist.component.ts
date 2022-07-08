import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { WeaponAddonsService } from '../weapon-addons/weapon-addons.service';

@Component({
  selector: 'app-weapon-addonslist',
  templateUrl: './weapon-addonslist.component.html',
  styleUrls: ['./weapon-addonslist.component.css']
})
export class WeaponAddonslistComponent implements OnInit {

  constructor(
    public addonServ: WeaponAddonsService,
    private router: Router
  ) { }

  @Output() onAddonSelected = new EventEmitter<string>();

  @Input() categFilter: string = '';
  @Input() kiegFilter: string = '';
  @Input() selectionMode: boolean = false;

  public weaponAddonId:string = '';

  sortMeBy(categ: string):void {
    this.categFilter = categ;
  }

  getAddonCats(): Array<any> | null {
    const categs = [...new Set(this.addonServ.weaponAddonsList.map(x => x.addonCategory))];
    return categs;
  }

  getAddonCatsFiltered(): Array<any> | null {
    if(this.categFilter == '') {
      const categs = [...new Set(this.addonServ.weaponAddonsList.map(x => x.addonCategory))];
      return categs;
    }
    const categs = [...new Set(this.addonServ.weaponAddonsList.filter(x=>x.addonCategory == this.categFilter)
      .map(x=>x.addonCategory))];
    return categs;
  }

  getAddonByPlace(categs: string):Array<any> {
    if (this.kiegFilter == '') {
      const place = [...new Set(this.addonServ.weaponAddonsList.filter(x => x.addonCategory == categs).map(x => x.addonPlace))];
      return place;
    }
    const place = [...new Set(this.addonServ.weaponAddonsList.filter(x=> x.addonCategory == this.categFilter)
    .filter(x=> x.addonPlace == this.kiegFilter).map(x=> x.addonPlace))];
    return place;
  }

  getAddons(type: string, categ: string): Array<any> | null {
    if (this.kiegFilter !== '') {
      const addons = [...new Set(this.addonServ.weaponAddonsList.filter(x => x.addonCategory == this.categFilter))]
      .filter(x=> x.addonPlace == this.kiegFilter).map(x=> x);
      return addons;
    }
    const addons = this.addonServ.weaponAddonsList.filter(x=> x.addonPlace == type)
    .filter(x=> x.addonCategory == categ);
    return addons;
  }

  gotoNewAddon() {
    (<any>this.router).navigate(["/newweaponaddon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/weaponaddonedit/"+id]);
  }

  sendAddonID(id: string) {
    this.onAddonSelected.next(id);
  }

  ngOnInit(): void {
    this.addonServ.getAddons().subscribe({
      next: (w) => {
        this.addonServ.weaponAddonsList = w;
      }
    });
  }

}
