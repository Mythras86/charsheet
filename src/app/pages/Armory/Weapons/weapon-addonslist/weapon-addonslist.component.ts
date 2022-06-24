import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() onAddonSelected = new EventEmitter<string>();

  @Input() categFilter: string = '';
  @Input() kiegFilter: string = '';

  public addonId:string = '';

  sortMeBy(categ: string):void {
    this.categFilter = categ;
  }

  getAddons(type: string, categ: string): Array<any> | null {
    if (this.kiegFilter !== '') {
      const addons = this.addonServ.addonsList.filter(x=> x.addonCategory == this.categFilter);
      return addons.filter(x=> x.addonPlace == this.kiegFilter);
    }
    const addons = this.addonServ.addonsList.filter(x=> x.addonPlace == type);
    return addons.filter(x=> x.addonCategory == categ);
  }

  getAddonCats(): Array<any> | null {
    const categs = [...new Set(this.addonServ.addonsList.map(x => x.addonCategory))];
    return categs;
  }

  getAddonCatsFiltered(): Array<any> | null {
    if(this.categFilter == '') {
      let categs = [...new Set(this.addonServ.addonsList.map(x => x.addonCategory))];
      return categs;
    }
    let categs = [...new Set(
      this.addonServ.addonsList.filter(x=>x.addonCategory == this.categFilter).map(x=>x.addonCategory)
    )];
    return categs;
  }

  getAddonPlace(categs: string):Array<any> {
    if (this.kiegFilter !== '') {
      const types = this.addonServ.addonsList.filter(x=> x.addonCategory == this.categFilter);
      return types.filter(x=> x.addonPlace == this.kiegFilter).map(x=> x.addonPlace);
    }
    const types = [...new Set(this.addonServ.addonsList.filter(x => x.addonCategory == categs).map(x => x.addonPlace))];
    return types;
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
        this.addonServ.addonsList = w;
      }
    });
  }

}
