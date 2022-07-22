import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Cybernetics, CyberneticsDataInterface } from './cybernetics.model';

const BACKEND_URL = environment.apiUrl + "/cybernetics/";

@Injectable({
  providedIn: 'root'
})
export class CyberneticsService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.cybersList = null;
    }

  public cybersList: Cybernetics[];

  private processCyberneticsData(cyberneticsData: CyberneticsDataInterface) {
    return cyberneticsData.cybernetics.map((w) => {
      return {
        id: (w as any)._id,
        cyberneticName: w.cyberneticName,
        cyberneticCategory: w.cyberneticCategory,
        cyberneticMaxLevel: w.cyberneticMaxLevel,
        cyberneticPrice: w.cyberneticPrice,
        cyberneticEssence: w.cyberneticEssence,
        cyberneticDesc: w.cyberneticDesc,
      } as Cybernetics
    });
  }

  private setCyberneticsList(cybersList: Cybernetics[]) {
    this.cybersList = cybersList;
  }

  getCybernetics(): Observable<Cybernetics[]> {
    if (this.cybersList !== null) {
      return of(this.cybersList)
    }
    return this.http
      .get<{ message: string; cybernetics: any}>(BACKEND_URL + "list")
      .pipe(
        map(this.processCyberneticsData),
        tap(this.setCyberneticsList.bind(this))
      )
  }

  getOneCybernetic(id: string) {
    return this.http.get<{
      _id: string;
      cyberneticName: string,
      cyberneticCategory: string,
      cyberneticMaxLevel: number,
      cyberneticPrice: number,
      cyberneticEssence: number,
      cyberneticDesc: string,
    }>(BACKEND_URL + id);
  }

  addOneCybernetic(
    cyberneticName: string,
    cyberneticCategory: string,
    cyberneticMaxLevel: number,
    cyberneticPrice: number,
    cyberneticEssence: number,
    cyberneticDesc: string,
  ) {
    const cyberneticData: Cybernetics = {
      id:'',
      cyberneticName: cyberneticName,
      cyberneticCategory: cyberneticCategory,
      cyberneticMaxLevel: cyberneticMaxLevel,
      cyberneticPrice: cyberneticPrice,
      cyberneticEssence: cyberneticEssence,
      cyberneticDesc: cyberneticDesc,
    };
    this.http.post<{ message: string; cybernetic: Cybernetics }>(
      BACKEND_URL + "create", cyberneticData).subscribe(response => {
        this.router.navigate(["/cyberneticslist"]);
      });
      this.cybersList = null;
      this.getCybernetics();
  }

  updateOneCybernetic(
    id: string,
    cyberneticName: string,
    cyberneticCategory: string,
    cyberneticMaxLevel: number,
    cyberneticPrice: number,
    cyberneticEssence: number,
    cyberneticDesc: string,
  ) {
    let cyberneticData: Cybernetics;
    cyberneticData = {
      id: id,
      cyberneticName: cyberneticName,
      cyberneticCategory: cyberneticCategory,
      cyberneticMaxLevel: cyberneticMaxLevel,
      cyberneticPrice: cyberneticPrice,
      cyberneticEssence: cyberneticEssence,
      cyberneticDesc: cyberneticDesc,
    };
    this.http
    .patch(BACKEND_URL + id, cyberneticData)
    .subscribe(response => {
      this.router.navigate(["/cyberneticslist"]);
    });
    this.cybersList = null;
    this.getCybernetics();
  }

  deleteOneCybernetic(id: string) {
    this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.router.navigate(["/cyberneticslist"]);
    });
    this.cybersList = null;
    this.getCybernetics();
  }
}

