import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CharSubServices } from '../services-for-subforms';
import { resources } from './resources.model';

@Component({
  selector: 'app-char-resources',
  templateUrl: './char-resources.component.html',
  styleUrls: ['./char-resources.component.css']
})
export class CharResourcesComponent implements OnInit {

  @Input() resourcesForm!: FormGroup;

  constructor(
    public charSubs: CharSubServices,
  ) {}

  nopoints:boolean = false;

  getRemainingKarma(): number {
    const basekarma = this.resourcesForm.get('basekarma')?.value;
    const gainedkarma = this.resourcesForm.get('gainedkarma')?.value;
    const karmaonattr = this.resourcesForm.get('karmaonattr')?.value;
    const karmaonskills = this.resourcesForm.get('karmaonskills')?.value;
    const karmaonmoney = this.resourcesForm.get('karmaonmoney')?.value;
    const karmaonmagic = this.resourcesForm.get('karmaonmagic')?.value;

    const remainingKarma = basekarma+gainedkarma-3*karmaonattr-2*karmaonskills-karmaonmoney-2*karmaonmagic;

    if(remainingKarma > 0) {
      this.nopoints = false;
      return remainingKarma;
    } else {
      this.nopoints = true;
      return remainingKarma;
    }
  }

  getRemainingMagic(): number {
    const karmaonmagic = this.resourcesForm.get('karmaonmagic')?.value;
    const spells = this.resourcesForm.get('magiconspells')?.value;
    const spirits = this.resourcesForm.get('magiconspirits')?.value;
    const magiconartifacts = this.resourcesForm.get('magiconartifacts')?.value;

    return karmaonmagic-spells-spirits-magiconartifacts;
  }

  getRemainingCash():number {
    const karmaonmoney = this.resourcesForm.get('karmaonmoney')?.value;
    const moneyonwapons = this.resourcesForm.get('moneyonwapons')?.value;
    const moneyontools = this.resourcesForm.get('moneyontools')?.value;
    const moneyoncyber = this.resourcesForm.get('moneyoncyber')?.value;
    const moneyonsoftware = this.resourcesForm.get('moneyonsoftware')?.value;
    const moneyonrides = this.resourcesForm.get('moneyonrides')?.value;
    const moneyonartifacts = this.resourcesForm.get('moneyonartifacts')?.value;

    return 6000*karmaonmoney-moneyoncyber-moneyonartifacts-moneyonrides-moneyonsoftware-moneyontools-moneyonwapons;
  }

  getMinKarma(fcname: string):number {
    const minkarma:any = resources.filter(x=>x.fcname == fcname).map(x=>x.minKarma);
    return minkarma;
  }

  getResources() {
    return resources;
  }

  getTotalValue(fcname: string):number {
    return this.charSubs.getFromContValue(fcname, this.resourcesForm);
  }

  ngOnInit() {

  }

}
