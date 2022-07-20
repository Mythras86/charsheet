import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Equipments, EquipmentsDataInterface } from './equipments.model';

const BACKEND_URL = environment.apiUrl + "/equipments/";

@Injectable({
  providedIn: 'root'
})
export class EquipmentsService {

  constructor(
    private http: HttpClient,
    private router: Router
    ) {
      this.equipmentsList = null;
    }

  public equipmentsList: Equipments[];

  private processEquipmentsData(equipmentsData: EquipmentsDataInterface) {
    return equipmentsData.equipments.map((w) => {
      return {
        id: (w as any)._id,
        equipmentName: w.equipmentName,
        equipmentCategory: w.equipmentCategory,
        equipmentLevel: w.equipmentLevel,
        equipmentWeight: w.equipmentWeight,
        equipmentPrice: w.equipmentPrice,
        equipmentDesc: w.equipmentDesc,
      } as Equipments
    });
  }

  private setEquipmentsList(equipmentsList: Equipments[]) {
    this.equipmentsList = equipmentsList;
  }

  getEquipments(): Observable<Equipments[]> {
    if (this.equipmentsList !== null) {
      return of(this.equipmentsList)
    }
    return this.http
      .get<{ message: string; equipments: any}>(BACKEND_URL + "list")
      .pipe(
        map(this.processEquipmentsData),
        tap(this.setEquipmentsList.bind(this))
      )
  }

  getOneEquipment(id: string) {
    return this.http.get<{
      _id: string;
      equipmentName: string,
      equipmentCategory: string,
      equipmentLevel: number,
      equipmentWeight: number,
      equipmentPrice: number,
      equipmentDesc: string,
    }>(BACKEND_URL + id);
  }

  addOneEquipment(
    equipmentName: string,
    equipmentCategory: string,
    equipmentLevel: number,
    equipmentWeight: number,
    equipmentPrice: number,
    equipmentDesc: string,
  ) {
    const equipmentData: Equipments = {
      id:'',
      equipmentName: equipmentName,
      equipmentCategory: equipmentCategory,
      equipmentLevel: equipmentLevel,
      equipmentWeight: equipmentWeight,
      equipmentPrice: equipmentPrice,
      equipmentDesc: equipmentDesc,
    };
    this.http.post<{ message: string; equipment: Equipments }>(
      BACKEND_URL + "create", equipmentData).subscribe(response => {
        this.router.navigate(["/equipmentslist"]);
      });
      this.equipmentsList = null;
      this.getEquipments();
  }

  updateOneEquipment(
    id: string,
    equipmentName: string,
    equipmentCategory: string,
    equipmentLevel: number,
    equipmentWeight: number,
    equipmentPrice: number,
    equipmentDesc: string,
  ) {
    let equipmentData: Equipments;
    equipmentData = {
      id: id,
      equipmentName: equipmentName,
      equipmentCategory: equipmentCategory,
      equipmentLevel: equipmentLevel,
      equipmentWeight: equipmentWeight,
      equipmentPrice: equipmentPrice,
      equipmentDesc: equipmentDesc,
    };
    this.http
    .patch(BACKEND_URL + id, equipmentData)
    .subscribe(response => {
      this.router.navigate(["/equipmentslist"]);
    });
    this.equipmentsList = null;
    this.getEquipments();
  }

  deleteOneEquipment(id: string) {
    this.http.delete(BACKEND_URL + id).subscribe(response => {
      this.router.navigate(["/equipmentslist"]);
    });
    this.equipmentsList = null;
    this.getEquipments();
  }
}

