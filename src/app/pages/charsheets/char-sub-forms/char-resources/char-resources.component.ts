import { AfterContentChecked, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DetailsService } from '../char-details/details.service';
import { CharWeaponsService } from '../char-tools/char-weapons.service';
import { resources } from './resources.model';
import { ResourcesService } from './resources.service';

@Component({
  selector: 'app-char-resources',
  templateUrl: './char-resources.component.html',
  styleUrls: ['./char-resources.component.css']
})
export class CharResourcesComponent implements OnInit, AfterContentChecked {

  @Input() resourcesForm!: FormGroup;

  constructor(
    private changeDetector: ChangeDetectorRef,
    public charWeapServ: CharWeaponsService,
    public resServ: ResourcesService,
    public detailsServ: DetailsService,
  ) {}

  public nopoints:boolean = false;

  public yourAttrs:number = 0;
  public yourSkills:number = 0;
  public yourMoney:number = 0;
  public yourMagic:number = 0;
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }

  getResFeedback(resName: string):number {
    return this.resServ[resName];
  }

  disableDec(fcname: string):number {
    if(fcname == 'karmaonattr') {
      return this.yourAttrs - this.resServ.spentOnAttrs;
    }
    if(fcname == 'karmaonskills') {
      return this.yourSkills - this.resServ.spentOnSkills;
    }
    if(fcname == 'karmaonmoney') {
      return this.yourMoney - this.resServ.moneyOnWeapons - this.resServ.moneyOnArmors;
    }
    return 0;
  }

  sendResData(fcname: string):void {
    if(fcname == 'karmaonattr') {
      const points:number = this.resourcesForm.get('karmaonattr')?.value;
      this.resServ.updateAttrs(points);
    }
    if(fcname == 'karmaonskills') {
      const points:number = this.resourcesForm.get('karmaonskills')?.value;
      this.resServ.updateSkills(points);
    }
    if(fcname == 'karmaonmoney' || 'gainedmoney') {
      const karmaonmoney:number = this.resourcesForm.get('karmaonmoney')?.value*6000;
      const gainedmoney:number = this.resourcesForm.get('gainedmoney')?.value;
      const money:number = karmaonmoney + gainedmoney - this.resServ.moneyOnArmors - this.resServ.moneyOnWeapons;
      this.resServ.updateMoney(money);
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
    return this.getFormcontrol(fcname).value;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit() {
    this.resServ.getAttrPoints.subscribe(yourAttrs => this.yourAttrs = yourAttrs);
    this.resServ.getSkillPoints.subscribe(yourSkills => this.yourSkills = yourSkills);
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
    this.resServ.getMagicPoints.subscribe(yourMagic => this.yourMagic = yourMagic);
  }

}
