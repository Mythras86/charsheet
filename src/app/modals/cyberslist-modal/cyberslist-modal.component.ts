import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CharCyberneticsService } from 'src/app/pages/charsheets/char-sub-forms/char-cyberworld/char-cybernetics.service';

@Component({
  selector: 'app-cyberslist-modal',
  templateUrl: './cyberslist-modal.component.html',
  styleUrls: ['./cyberslist-modal.component.css']
})
export class CyberslistModalComponent implements OnInit {

  constructor(
    public charCyberServ: CharCyberneticsService,
  ) { }

  public canBeClosed: boolean = false;
  closeEvent: Subject<string> = new Subject;

  loadData(modalData: any): void {
  }

  onCyberneticSelected(id: string) {
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
