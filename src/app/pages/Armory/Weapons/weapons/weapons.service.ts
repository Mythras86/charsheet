import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from "@angular/router";
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Weapons, WeaponsDataInterface } from './weapons.model';

const BACKEND_URL = environment.apiUrl + "/weapons/";

@Injectable({providedIn: 'root'})
export class WeaponsService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.weaponsList = null;
    }

  public weaponsList: Weapons[];

  private processWeaponsData(weaponsData: WeaponsDataInterface) {
    return weaponsData.weapons.map((w) => {
      return {
        id: (w as any)._id,
        weaponName: w.weaponName,
        weaponCategory: w.weaponCategory,
        weaponType: w.weaponType,
        weaponClip: w.weaponClip,
        weaponMods: w.weaponMods,
        weaponRange: w.weaponRange,
        weaponPower: w.weaponPower,
        weaponDamage: w.weaponDamage,
        weaponDmgType: w.weaponDmgType,
        weaponWeight: w.weaponWeight,
        weaponPrice: w.weaponPrice,
        weaponDesc: w.weaponDesc,
      } as Weapons
    });
  }

  private setWeaponsList(weaponsList: Weapons[]) {
    this.weaponsList = weaponsList;
  }

  getWeapons(): Observable<Weapons[]> {
    if (this.weaponsList !== null) {
      return of(this.weaponsList)
    }

    return this.http
      .get<{ message: string; weapons: any}>(BACKEND_URL + "weaponslist")
      .pipe(
        map(this.processWeaponsData),
        tap(this.setWeaponsList.bind(this))
      )
  }

  getOneWeapon(id: string) {
    return this.http.get<{
      _id: string;
      weaponName: string,
      weaponCategory: string,
      weaponType: string,
      weaponClip: string,
      weaponMods: string,
      weaponRange: number,
      weaponPower: number,
      weaponDamage: number,
      weaponDmgType: string,
      weaponWeight: number,
      weaponPrice: number,
      weaponDesc: string,
    }>(BACKEND_URL + id);
  }

  addOneWeapon(
    weaponName: string,
    weaponCategory: string,
    weaponType: string,
    weaponClip: string,
    weaponMods: string,
    weaponRange: number,
    weaponPower: number,
    weaponDamage: number,
    weaponDmgType: string,
    weaponWeight: number,
    weaponPrice: number,
    weaponDesc: string,
  ) {
    const weaponData: Weapons = {
      id:'',
      weaponName: weaponName,
      weaponCategory: weaponCategory,
      weaponType: weaponType,
      weaponClip: weaponClip,
      weaponMods: weaponMods,
      weaponRange: weaponRange,
      weaponPower: weaponPower,
      weaponDamage: weaponDamage,
      weaponDmgType: weaponDmgType,
      weaponWeight: weaponWeight,
      weaponPrice: weaponPrice,
      weaponDesc: weaponDesc,
    };
    this.http.post<{ message: string; weapon: Weapons }>(
      BACKEND_URL + "create", weaponData).subscribe(response => {
        this.router.navigate(["/weaponslist"]);
      });
    this.getWeapons();
  }

  updateOneWeapon(
    id: string,
    weaponName: string,
    weaponCategory: string,
    weaponType: string,
    weaponClip: string,
    weaponMods: string,
    weaponRange: number,
    weaponPower: number,
    weaponDamage: number,
    weaponDmgType: string,
    weaponWeight: number,
    weaponPrice: number,
    weaponDesc: string,
  ) {
    let weaponData: Weapons;
    weaponData = {
      id: id,
      weaponName: weaponName,
      weaponCategory: weaponCategory,
      weaponType: weaponType,
      weaponClip: weaponClip,
      weaponMods: weaponMods,
      weaponRange: weaponRange,
      weaponPower: weaponPower,
      weaponDamage: weaponDamage,
      weaponDmgType: weaponDmgType,
      weaponWeight: weaponWeight,
      weaponPrice: weaponPrice,
      weaponDesc: weaponDesc,
    };
    this.http
      .patch(BACKEND_URL + id, weaponData)
      .subscribe(response => {
        this.router.navigate(["/weaponslist"]);
      });
    this.getWeapons();
  }

  deleteOneWeapon(id: string) {
    return this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.router.navigate(["/weaponslist "]);
    });
  }
}

