import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ArmorsService } from '../armors/armors.service';

@Component({
  selector: 'app-armorslist',
  templateUrl: './armorslist.component.html',
  styleUrls: ['./armorslist.component.css']
})
export class ArmorslistComponent implements OnInit {

  constructor(
    public armorsServ: ArmorsService,
    private router: Router,
  ) { }

  @Output() onArmorSelected = new EventEmitter<string>();

  @Input() public categFilter: string = '';
  @Input() selectionMode: boolean = false;

  public armorId:string = '';

  getArmorCats(): Array<any> | null {
    if (this.categFilter == '') {
      const categs = [...new Set(this.armorsServ.armorsList.map(x=> x.armorCategory))];
      return categs;
    }
    const categs = [...new Set(this.armorsServ.armorsList.filter(x=> x.armorCategory == this.categFilter).map(x=> x.armorCategory))];
    return categs;
  }

  getArmors(categ: string): Array<any> | null {
    if (this.categFilter == '') {
      const filteredarmor = this.armorsServ.armorsList.filter(x => x.armorCategory == categ);
      return filteredarmor;
    }
    const filteredarmor = this.armorsServ.armorsList.filter(x => x.armorCategory == this.categFilter);
    return filteredarmor;
  }

  sendArmorID(id: string) {
    this.onArmorSelected.next(id);
  }

  gotoNewArmor() {
    (<any>this.router).navigate(["/newarmor"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/armoredit/"+id]);
  }

  ngOnInit():void {
    this.armorsServ.getArmors().subscribe({
      next: (w) => {
        this.armorsServ.armorsList = w;
      }
    });
  }

}
