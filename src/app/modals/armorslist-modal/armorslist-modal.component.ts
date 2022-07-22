import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharArmorsService } from 'src/app/pages/charsheets/char-sub-forms/char-armors/char-armors.service';

@Component({
  selector: 'app-armorslist-modal',
  templateUrl: './armorslist-modal.component.html',
  styleUrls: ['./armorslist-modal.component.css']
})
export class ArmorslistModalComponent implements OnInit {

  constructor(
    public charArmorService: CharArmorsService,
  ) { }

  public categFilter: string = '';

  public canBeClosed: boolean = false;
  closeEvent: Subject<string> = new Subject;

  loadData(modalData: any): void {
    this.categFilter = modalData.categFilter;
  }

  onArmorSelect(id: string) {
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
