import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Armors, ArmorsDataInterface } from './armors.model';

const BACKEND_URL = environment.apiUrl + "/armors/";

@Injectable({
  providedIn: 'root'
})
export class ArmorsService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.armorsList = null;
    }

  public armorsList: Armors[];

  private processArmorsData(armorsData: ArmorsDataInterface) {
    return armorsData.armors.map((w) => {
      return {
        id: (w as any)._id,
        armorName: w.armorName,
        armorCategory: w.armorCategory,
        armorRating: w.armorRating,
        armorWeight: w.armorWeight,
        armorPrice: w.armorPrice,
        armorDesc: w.armorDesc,
      } as Armors
    });
  }

  private setArmorsList(armorsList: Armors[]) {
    this.armorsList = armorsList;
  }

  getArmors(): Observable<Armors[]> {
    if (this.armorsList !== null) {
      return of(this.armorsList)
    }
    return this.http
      .get<{ message: string; armors: any}>(BACKEND_URL + "armorslist")
      .pipe(
        map(this.processArmorsData),
        tap(this.setArmorsList.bind(this))
      )
  }

  getOneArmor(id: string) {
    return this.http.get<{
      _id: string;
      armorName: string,
      armorCategory: string,
      armorRating: number,
      armorWeight: number,
      armorPrice: number,
      armorDesc: string,
    }>(BACKEND_URL + id);
  }

  addOneArmor(
    armorName: string,
    armorCategory: string,
    armorRating: number,
    armorWeight: number,
    armorPrice: number,
    armorDesc: string,
  ) {
    const armorData: Armors = {
      id:'',
      armorName: armorName,
      armorCategory: armorCategory,
      armorRating: armorRating,
      armorWeight: armorWeight,
      armorPrice: armorPrice,
      armorDesc: armorDesc,
    };
    this.http.post<{ message: string; armor: Armors }>(
      BACKEND_URL + "create", armorData).subscribe(response => {
        this.router.navigate(["/armorslist"]);
      });
  }

  updateOneArmor(
    id: string,
    armorName: string,
    armorCategory: string,
    armorRating: number,
    armorWeight: number,
    armorPrice: number,
    armorDesc: string,
  ) {
    let armorData: Armors;
    armorData = {
      id: id,
      armorName: armorName,
      armorCategory: armorCategory,
      armorRating: armorRating,
      armorWeight: armorWeight,
      armorPrice: armorPrice,
      armorDesc: armorDesc,
    };
    this.http
      .patch(BACKEND_URL + id, armorData)
      .subscribe(response => {
        this.router.navigate(["/armorslist"]);
      });
    this.getArmors();
  }

  deleteOneArmor(id: string) {
    return this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.router.navigate(["/armorslist "]);
    });
  }
}

