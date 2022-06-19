import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharWeaponsService } from 'src/app/pages/charsheets/char-sub-forms/char-weapons/char-weapons.service';
import { AModal } from './modal.abstract';

@Component({
  selector: 'app-weaponlist-modal',
  templateUrl: './weaponslist-modal.component.html',
  styleUrls: ['./weaponslist-modal.component.css']
})
export class WeaponslistModalComponent implements OnInit, AModal {

  constructor(
    public charWeaponServ: CharWeaponsService,
  ) { }

  public canBeClosed: boolean = false;
  closeEvent: Subject<string> = new Subject;

  loadData(modalData: any): void {

  }

  onWeaponSelect(id: string) {
    this.closeEvent.next(id);
    this.closeEvent.complete();
  }

  ngOnInit(): void {
  }

}
