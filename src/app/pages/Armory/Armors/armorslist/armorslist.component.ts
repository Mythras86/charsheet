import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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

  public armorId:string = '';

  getArmors(categ: string): Array<any> | null {
    return this.armorsServ.armorsList.filter(x => x.armorCategory == categ);
  }

  getArmorCats(): Array<any> | null {
    const categs = [...new Set(this.armorsServ.armorsList.map(x=> x.armorCategory))];
    return categs;
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
