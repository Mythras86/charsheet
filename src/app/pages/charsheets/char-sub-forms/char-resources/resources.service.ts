import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { FormGroupConfig } from '../../char.fgconfing';
import { Resources } from './resources.model';

@Injectable({
  providedIn: 'root'
})
export class ResourcesService {

  constructor(
    private fb: FormBuilder,
    ) { }

    spentOnAttrs:number = 0;
    spentOnSkills:number = 0;
    spentOnMagic:number = 0;
    moneyOnWeapons:number = 0;
    moneyOnArmors:number = 0;

    private remainingAttrs = new BehaviorSubject<number>(0);
    getAttrPoints = this.remainingAttrs.asObservable();

    public updateAttrs(points: number):void {
      this.remainingAttrs.next(points);
    }

    private remainingSkills = new BehaviorSubject<number>(0);
    getSkillPoints = this.remainingSkills.asObservable();

    public updateSkills(points: number):void {
      this.remainingSkills.next(points);
    }

    private remainingMoney = new BehaviorSubject<number>(0);
    getMoneyFlow = this.remainingMoney.asObservable();

    public updateMoney(credit: number):void {
      this.remainingMoney.next(credit);
    }

    private remainingMagic = new BehaviorSubject<number>(0);
    getMagicPoints = this.remainingMagic.asObservable();

    public updateMagic(points: number):void {
      this.remainingMagic.next(points);
    }

  createResources(): FormGroup {
    const resources: FormGroupConfig<Resources> = {
      basekarma: [250, {value:250, disabled: false}],
      gainedkarma: [50, {value:50, disabled: false}],
      karmaonattr: [0, {value:0, disabled: false}],
      karmaonskills: [0, {value:0, disabled: false}],
      karmaonmoney: [0, {value:0, disabled: false}],
      gainedmoney: [50000, {value:50000, disabled: false}],
      karmaonmagic: [0, {value:0, disabled: false}],
    };
    return this.fb.group(resources);
  };

  getPointsSpent(varstring: string, points: number) {
    return this[varstring] = points;
  }
}
