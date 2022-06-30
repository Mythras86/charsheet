import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Fajok, HagyomanyLista, Hagyomanyok, Nemek, Nyelvek } from '../char-utility'
import { details } from './details.model';
import { DetailsService } from './details.service';

@Component({
  selector: 'app-char-details',
  templateUrl: './char-details.component.html',
  styleUrls: ['./char-details.component.css']
})
export class CharDetailsComponent implements OnInit, OnDestroy {

  @Input() detailsForm!: FormGroup;

  hideMe: boolean = false;
  yourRace: string;
  yourMagic: string;
  yourLanguage: string;

  constructor(
    public detailsServ: DetailsService,
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

    return null;
  }

  sendData():void {
    this.detailsServ.updateRace(this.detailsForm.get('faj')?.value);
    this.detailsServ.updateMagic(this.detailsForm.get('magikus')?.value);
    this.detailsServ.updateLanguage(this.detailsForm.get('anyanyelv')?.value);
  }

  ngOnInit(): void {
    this.detailsServ.getRace.subscribe(yourRace => this.yourRace = yourRace);
    this.detailsServ.getMagic.subscribe(yourMagic => this.yourMagic = yourMagic);
    this.detailsServ.getLanguage.subscribe(yourLanguage => this.yourLanguage = yourLanguage);
   }

  ngOnDestroy(): void {

  }
}
