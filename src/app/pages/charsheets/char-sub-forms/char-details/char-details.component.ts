import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Fajok, HagyomanyLista, Hagyomanyok, Nemek, Nyelvek, selectRaceService } from '../char-races'
import { details } from './details.model';

@Component({
  selector: 'app-char-details',
  templateUrl: './char-details.component.html',
  styleUrls: ['./char-details.component.css']
})
export class CharDetailsComponent implements OnInit, OnDestroy {

  @Input() detailsForm!: FormGroup;

  hideMe: boolean = false;
  yourRace!: string;

  constructor(
    private selectraceservice: selectRaceService,
  ) {  }



  getDetailsData() {
    return details;
  }

  getDetails(fcname: string) {
    return this.detailsForm.get(fcname)?.value;
  }

  listGetter(target:string) {
    if (target == 'Fajok') {
      const list = Fajok.map(x=> x.fajnev);
      return list;
    };
    if (target == 'Nem') {
      const list = Nemek.map(x=> x);
      return list;
    };
    if (target == 'Nyelvek') {
      const lang = Nyelvek.map(x => x);
      return lang;
    };

    if (target == 'Hagyomany') {
      return Hagyomanyok.map(x=> x.text);
    }

    if (target == 'Utak') {
      const valasztotthagyomany = this.detailsForm.get('magikus')?.value;
      const hagyomanylista = Hagyomanyok.filter(x=>x.text == valasztotthagyomany).map(x=> x.list);
      const utak = HagyomanyLista.filter(x=> x.list == hagyomanylista).map(x=> x.text);
      return utak;
    }

    return;
  }

  sendRaceData(): void {
    this.selectraceservice.updateRace(
      this.detailsForm.get('faj')?.value
    );
  }

  ngOnInit(): void {
    this.selectraceservice.getRace.subscribe(yourRace => this.yourRace = yourRace);
   }

  ngOnDestroy(): void { }
}
