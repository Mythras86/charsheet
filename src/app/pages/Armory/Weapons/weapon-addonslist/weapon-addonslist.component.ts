import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Addons } from '../weapon-addons/weapon-addons.model';
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

  @Input() sortMeFilter: string = 'none';
  @Input() kiegFilter: string = '';

  public addonId:string = '';

  sortMeBy(categ: string):void {
    this.sortMeFilter = categ;
  }

  getAddons(type: string, categ: string): Array<any> | null {
    const addons = this.addonServ.addonsList.filter(x=> x.addonPlace == type).filter(x=> x.addonCategory == categ);
    return addons;
  }

  getAddonCats(): Array<any> | null {
    const categs = [...new Set(this.addonServ.addonsList.map(x => x.addonCategory))];
    return categs;
  }

  getAddonCatsFiltered(): Array<any> | null {
    if(this.sortMeFilter == 'none') {
      let categs = [...new Set(this.addonServ.addonsList.map(x => x.addonCategory))];
      return categs;
    }
    let categs = [...new Set(
      this.addonServ.addonsList.filter(x=>x.addonCategory == this.sortMeFilter).map(x=>x.addonCategory)
    )];
    return categs;
  }

  getAddonPlace(categs: string):Array<any> {
    const types = [...new Set(this.addonServ.addonsList.filter(x => x.addonCategory == categs).map(x => x.addonPlace))];
    return types;
  }


  gotoNewAddon() {
    (<any>this.router).navigate(["/newaddon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/edit/"+id]);
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
