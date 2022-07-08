import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Output() onWeaponSelected = new EventEmitter<string>();

  @Input() selectionMode: boolean = false;

  public sortMeFilter: string = 'none';

  public weaponId:string = '';

  sortMeBy(categ: string):void {
    this.sortMeFilter = categ;
  }

  getWeapons(type: string): Array<any> | null {
    return this.weaponsServ.weaponsList.filter(x => x.weaponType == type);
  }

  getWeaponCats(): Array<any> | null {
    const categs = [...new Set(this.weaponsServ.weaponsList.map(x=> x.weaponCategory))];
    return categs;
  }

  getWeaponCatsFiltered(): Array<any> | null {
    if(this.sortMeFilter == 'none') {
      let categs = [...new Set(this.weaponsServ.weaponsList.map(x=> x.weaponCategory))];
      return categs;
    }
    let categs = [...new Set(this.weaponsServ.weaponsList.filter(x=>x.weaponCategory == this.sortMeFilter).map(x=>x.weaponCategory))];
    return categs;
  }

  getWeaponTypes(categs: string):Array<any> {
    const types = [...new Set(this.weaponsServ.weaponsList.filter(x => x.weaponCategory == categs).map(x=> x.weaponType))];
    return types;
  }

  sendWeaponID(id: string) {
    this.onWeaponSelected.next(id);
  }

  gotoNewWeapon() {
    (<any>this.router).navigate(["/newweapon"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/weaponedit/"+id]);
  }

  ngOnInit():void {
    this.weaponsServ.getWeapons().subscribe({
      next: (w) => {
        this.weaponsServ.weaponsList = w;
      }
    });
  }

}
