import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharArmorsService } from 'src/app/pages/charsheets/char-sub-forms/char-armors/char-armors.service';
import { AModal } from '../weaponslist-modal/modal.abstract';

@Component({
  selector: 'app-armoraddonslist-modal',
  templateUrl: './armoraddonslist-modal.component.html',
  styleUrls: ['./armoraddonslist-modal.component.css']
})
export class ArmorAddonslistModalComponent implements OnInit, AModal {

  constructor(
    public charArmorServ: CharArmorsService,
  ) { }

  public kiegFilter: string = '';

  public canBeClosed: boolean = false;
  closeEvent: Subject<string> = new Subject;


  loadData(modalData: any): void {
    this.kiegFilter = modalData.kiegFilter;
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
