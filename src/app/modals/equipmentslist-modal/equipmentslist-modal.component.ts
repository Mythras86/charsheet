import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharEquipmentsService } from 'src/app/pages/charsheets/char-sub-forms/char-tools/char-equipments.service';

@Component({
  selector: 'app-equipmentslist-modal',
  templateUrl: './equipmentslist-modal.component.html',
  styleUrls: ['./equipmentslist-modal.component.css']
})
export class EquipmentslistModalComponent implements OnInit {

  constructor(
    public charEquipsServ: CharEquipmentsService,
  ) { }

  public canBeClosed: boolean = false;
  closeEvent: Subject<string> = new Subject;

  loadData(modalData: any): void {
  }

  onEquipmentSelected(id: string) {
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
