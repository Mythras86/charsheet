import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CharWeaponsService } from '../char-weapons/char-weapons.service';
import { CharSubServices } from '../services-for-subforms';
import { resources } from './resources.model';
import { ResourcesService } from './resources.service';

@Component({
  selector: 'app-char-resources',
  templateUrl: './char-resources.component.html',
  styleUrls: ['./char-resources.component.css']
})
export class CharResourcesComponent implements OnInit {

  @Input() resourcesForm!: FormGroup;

  constructor(
    public charSubs: CharSubServices,
    private resServ: ResourcesService,
    public charWeapServ: CharWeaponsService,
  ) {}

  public nopoints:boolean = false;
  public yourMoney:number = 0;
  public yourSkills:number = 0;
  public yourAttrs:number = 0;

  sendResData(fcname: string):void {
    if(fcname == 'karmaonskills') {
      const points = this.resourcesForm.get('karmaonskills')?.value;
      this.resServ.updateSkills(points);
    }
    if(fcname == 'karmaonmoney' || 'gainedmoney') {
      const karmaonmoney = this.resourcesForm.get('karmaonmoney')?.value;
      const gainedmoney = this.resourcesForm.get('gainedmoney')?.value;
      this.resServ.updateMoney(karmaonmoney*6000+gainedmoney);
    }
    if(fcname == 'karmaonattr') {
      const points = this.resourcesForm.get('karmaonattr')?.value;
      this.resServ.updateAttrs(points);
    }
    return;
  }

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
    const gainedmoney = this.resourcesForm.get('gainedmoney')?.value;
    const moneyonweapons = this.charWeapServ.spentMoneyOnWeapons;
    const moneyontools = this.resourcesForm.get('moneyontools')?.value;
    const moneyoncyber = this.resourcesForm.get('moneyoncyber')?.value;
    const moneyonsoftware = this.resourcesForm.get('moneyonsoftware')?.value;
    const moneyonrides = this.resourcesForm.get('moneyonrides')?.value;
    const moneyonartifacts = this.resourcesForm.get('moneyonartifacts')?.value;

    return 6000*karmaonmoney+gainedmoney-moneyoncyber-moneyonartifacts-moneyonrides-moneyonsoftware-moneyontools-moneyonweapons;
  }

  getMinKarma(fcname: string):number {
    const minkarma:any = resources.filter(x=>x.fcname == fcname).map(x=>x.minKarma);
    return minkarma;
  }

  getResources() {
    return resources;
  }

  getFormcontrol(fcname: string)  {
    let fc = this.resourcesForm.get(fcname);
    return fc;
  }

  getTotalValue(fcname: string):number {
    this.sendResData(fcname);
    return this.charSubs.getFromContValue(fcname, this.resourcesForm);
  }

  ngOnInit() {
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
    this.resServ.getSkillPoints.subscribe(yourSkills => this.yourSkills = yourSkills);
    this.resServ.getAttrPoints.subscribe(yourAttrs => this.yourAttrs = yourAttrs);
  }

}
