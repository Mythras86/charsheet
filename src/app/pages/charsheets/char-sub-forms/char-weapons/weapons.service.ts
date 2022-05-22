import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Weapons } from './weapons.model';

const BACKEND_URL = environment.apiUrl + "/weapons/";

@Injectable({providedIn: 'root'})

export class WeaponsService {

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) { }

  public weaponslist: Weapons[] = [];
  private weaponsUpdated = new Subject<{ weapons: Weapons[]}>();

  createWeapons(): FormGroup {
    const weaponsForm = {
      weapons: this.fb.array([]),
    };
    return this.fb.group(weaponsForm);
  }

  getWeapons() {
    this.http
      .get<{ message: string; weapons: any}>(BACKEND_URL + "weaponslist")
      .pipe(map(weaponsData => {
          return {
            weapons: weaponsData.weapons.map((weapon: {
              _id: string;
              weaponName: string,
              weaponType: string,
              weaponRange: number,
              weaponPower: number,
              weaponDamage: number,
              weaponWeight: number,
              weaponPrice: number,
              weaponDesc: string,
             }) => {
              return {
                weaponName: weapon.weaponName,
                weaponType: weapon.weaponType,
                weaponRange: weapon.weaponRange,
                weaponPower: weapon.weaponPower,
                weaponDamage: weapon.weaponDamage,
                weaponWeight: weapon.weaponWeight,
                weaponPrice: weapon.weaponPrice,
                weaponDesc: weapon.weaponDesc,
              };
            }),
          };
        })
      )
      .subscribe(transformedWeaponsData => {
        this.weaponslist = transformedWeaponsData.weapons;
        this.weaponsUpdated.next({
          weapons: [...this.weaponslist],
        });
      });
  }

  getWeaponsUpdateListener() {
    return this.weaponsUpdated.asObservable();
  }

  getOneWeapon(id: string) {
    return this.http.get<{
      _id: string;
      weaponName: string,
      weaponType: string,
      weaponRange: number,
      weaponPower: number,
      weaponDamage: number,
      weaponWeight: number,
      weaponPrice: number,
      weaponDesc: string,
    }>(BACKEND_URL + id);
  }

  addOneWeapon(
    weaponName: string,
    weaponType: string,
    weaponRange: number,
    weaponPower: number,
    weaponDamage: number,
    weaponWeight: number,
    weaponPrice: number,
    weaponDesc: string,
  ) {
    const weaponData: Weapons = {
      weaponName: weaponName,
      weaponType: weaponType,
      weaponRange: weaponRange,
      weaponPower: weaponPower,
      weaponDamage: weaponDamage,
      weaponWeight: weaponWeight,
      weaponPrice: weaponPrice,
      weaponDesc: weaponDesc,
    };
    this.http.post<{ message: string; weapon: Weapons }>(
      BACKEND_URL + "create", weaponData).subscribe(responseData => {
        this.router.navigate(["/equipments"]);
      });
  }

  updateOneWeapon(
    id: string,
    weaponName: string,
    weaponType: string,
    weaponRange: number,
    weaponPower: number,
    weaponDamage: number,
    weaponWeight: number,
    weaponPrice: number,
    weaponDesc: string,
  ) {
    let weaponData: Weapons;
    weaponData = {
      weaponName: weaponName,
      weaponType: weaponType,
      weaponRange: weaponRange,
      weaponPower: weaponPower,
      weaponDamage: weaponDamage,
      weaponWeight: weaponWeight,
      weaponPrice: weaponPrice,
      weaponDesc: weaponDesc,
    };
    this.http
      .put(BACKEND_URL + id, weaponData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteOneWeapon(weaponId: string) {
    return this.http.delete(BACKEND_URL + weaponId);
  }
}
