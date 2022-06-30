import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArmorAddonsService } from '../armor-addons/armor-addons.service';

@Component({
  selector: 'app-armor-addonslist',
  templateUrl: './armor-addonslist.component.html',
  styleUrls: ['./armor-addonslist.component.css']
})
export class ArmorAddonslistComponent implements OnInit {

  constructor(
    public addonServ: ArmorAddonsService,
    private router: Router
  ) { }

  @Output() onAddonSelected = new EventEmitter<string>();

  @Input() kiegFilter: string = '';

  public addonId:string = '';

  getAddons(type: string): Array<any> | null {
    if (this.kiegFilter !== '') {
      const addons = this.addonServ.armorAddonsList.filter(x=> x.addonPlace == this.kiegFilter);
      return addons;
    }
    const addons = this.addonServ.armorAddonsList.filter(x=> x.addonPlace == type);
    return addons;
  }

  getAddonPlace(categs: string):Array<any> {
    if (this.kiegFilter !== '') {
      const types = this.addonServ.armorAddonsList.filter(x=> x.addonPlace == this.kiegFilter).map(x=> x.addonPlace)
      return types;
    }
    const types = [...new Set(this.addonServ.armorAddonsList.map(x => x.addonPlace))];
    return types;
  }

  gotoNewAddon() {
    (<any>this.router).navigate(["/newarmoraddon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/armoraddonedit/"+id]);
  }

  sendAddonID(id: string) {
    this.onAddonSelected.next(id);
  }

  ngOnInit(): void {
    this.addonServ.getAddons().subscribe({
      next: (w) => {
        this.addonServ.armorAddonsList = w;
      }
    });
  }

}
