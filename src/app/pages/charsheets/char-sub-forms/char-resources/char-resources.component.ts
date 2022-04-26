import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormGroupConfig } from '../../char.fgconfing';
import { CharSubServices } from '../services-for-subforms';
import { Resources } from './resources.model';

@Component({
  selector: 'app-char-resources',
  templateUrl: './char-resources.component.html',
  styleUrls: ['./char-resources.component.css']
})
export class CharResourcesComponent {

  @Input() resourcesForm!: FormGroup;

  constructor(
    public charSubs: CharSubServices,
    private fb: FormBuilder
  ) {}

  resources: Array<any> = [
    {nev: 'Induló Karma', csoport: 'Karma', fcname: 'basekarma'},
    {nev: 'Kapott Karma', csoport: 'Karma', fcname: 'gainedkarma'},
    {nev: 'Tulajdonságpontok', csoport: 'Karma', fcname: 'karmaonattr', minKarma:3},
    {nev: 'Szakértelempontok', csoport: 'Karma', fcname: 'karmaonskills', minKarma:2},
    {nev: 'Erőforrások', csoport: 'Karma', fcname: 'karmaonmoney'},
    {nev: 'Varázslat pontok', csoport: 'Karma', fcname: 'karmaonmagic'},
    {nev: 'Varázslatok', csoport: 'Mágia', fcname: 'magiconspells'},
    {nev: 'Szellemek', csoport: 'Mágia', fcname: 'magiconspirits'},
    {nev: 'Mágikus eszközök', csoport: 'Mágia', fcname: 'magiconartifacts'},
    {nev: 'Fegyverek', csoport: 'Erőforrások', fcname: 'moneyonwapons'},
    {nev: 'Felszerelések', csoport: 'Erőforrások', fcname: 'moneyontools'},
    {nev: 'Kiberverek', csoport: 'Erőforrások', fcname: 'moneyoncyber'},
    {nev: 'Programok', csoport: 'Erőforrások', fcname: 'moneyonsoftware'},
    {nev: 'Járművek', csoport: 'Erőforrások', fcname: 'moneyonrides'},
    {nev: 'Mágikus eszközök', csoport: 'Erőforrások', fcname: 'moneyonartifacts'},
  ];

  getRemainingKarma(): number {
    const basekarma = this.resourcesForm.get('basekarma')?.value;
    const gainedkarma = this.resourcesForm.get('gainedkarma')?.value;
    const karmaonattr = this.resourcesForm.get('karmaonattr')?.value;
    const karmaonskills = this.resourcesForm.get('karmaonskills')?.value;
    const karmaonmoney = this.resourcesForm.get('karmaonmoney')?.value;
    const karmaonmagic = this.resourcesForm.get('karmaonmagic')?.value;

    return basekarma+gainedkarma-3*karmaonattr-2*karmaonskills-karmaonmoney-karmaonmagic;
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

    return karmaonmoney-moneyoncyber-moneyonartifacts-moneyonrides-moneyonsoftware-moneyontools-moneyonwapons;
  }

  getMinKarma(fcname: string):number {
    const minkarma:any = this.resources.filter(x=>x.fcname == fcname).map(x=>x.minKarma);
    return minkarma;
  }

  getResources() {
    return this.resources;
  }

  getTotalValue(fcname: string):any {
    return this.charSubs.getFromContValue(fcname, this.resourcesForm);
  }

}
