import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter } from 'rxjs/operators';
import { CharWeaponsService } from 'src/app/pages/charsheets/char-sub-forms/char-weapons/char-weapons.service';
import { AModal } from '../weaponslist-modal/modal.abstract';

@Component({
  selector: 'app-addonslist-modal',
  templateUrl: './addonslist-modal.component.html',
  styleUrls: ['./addonslist-modal.component.css']
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

  ngOnInit(): void {
  }

}
