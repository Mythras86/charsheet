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

  constructor(
    public detailsServ: DetailsService,
    ) {  }

    yourRace: string;
    yourLanguage: string;
    public hideMe:boolean = true;

    toggleHide():boolean {
      return this.hideMe = !this.hideMe;
    }

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

  getDefault(fcname: string):number {
    if (this.yourRace !== '') {
      if (fcname == 'eletkor') {
        const defAge = Fajok.filter(x=>x.fajnev == this.yourRace).map(x=>x.defAge)[0];
        return defAge;
      }
      if (fcname == 'magassag') {
        const defHeight = Fajok.filter(x=>x.fajnev == this.yourRace).map(x=>x.defHeight)[0];
        return defHeight;
      }
      if (fcname == 'testsuly') {
        const defWieght = Fajok.filter(x=>x.fajnev == this.yourRace).map(x=>x.defWieght)[0];
        return defWieght;
      }
    }
    return 0;
  }

  sendData():void {
    this.detailsServ.updateRace(this.detailsForm.get('faj')?.value);
    this.detailsServ.updateLanguage(this.detailsForm.get('anyanyelv')?.value);
  }

  ngOnInit(): void {
    this.detailsServ.getRace.subscribe(yourRace => this.yourRace = yourRace);
    this.detailsServ.getLanguage.subscribe(yourLanguage => this.yourLanguage = yourLanguage);
   }

  ngOnDestroy(): void {

  }
}
