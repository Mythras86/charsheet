import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharWeaponsService } from 'src/app/pages/charsheets/char-sub-forms/char-tools/char-weapons.service';
import { AModal } from '../weaponslist-modal/modal.abstract';

@Component({
  selector: 'app-weaponaddonslist-modal',
  templateUrl: './weaponaddonslist-modal.component.html',
  styleUrls: ['./weaponaddonslist-modal.component.css']
})
export class AddonslistModalComponent implements OnInit, AModal {

  constructor(
    public charWeaponServ: CharWeaponsService,
  ) { }

  public categFilter: string = '';
  public kiegFilter: string = '';

  public canBeClosed: boolean = false;
  closeEvent: Subject<string> = new Subject;


  loadData(modalData: any): void {
    this.kiegFilter = modalData.kiegFilter;
    this.categFilter = modalData.categFilter;
  }

  onAddonSelect(id: string) {
    this.closeEvent.next(id);
    this.closeEvent.complete();
  }

  onClose() {
    this.closeEvent.next('none');
    this.closeEvent.complete();
  }

  ngOnInit(): void {
  }
}
