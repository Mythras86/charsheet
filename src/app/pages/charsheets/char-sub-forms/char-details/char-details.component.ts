import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Fajok, Nemek } from '../char-races'

@Component({
  selector: 'app-char-details',
  templateUrl: './char-details.component.html',
  styleUrls: ['./char-details.component.css']
})
export class CharDetailsComponent implements OnInit {

  @Input() detailsForm!: FormGroup;

  detailsData: Array<any>;
  hideMe: boolean = false;

  constructor(private fb: FormBuilder) {

    this.detailsData = [
      {nev: 'Teljes név', fcname:'teljesnev', type: 'text', megjegyz: 'Amit a Sírodra vésnek...'},
      {nev: 'Becenév', fcname:'becenev', type: 'text', megjegyz: 'Ahogy a Haverok ismernek...'},
      {nev: 'Álnév', fcname:'alnev', type: 'text', megjegyz: 'Ahogy az Alvilág ismer...'},
      {nev: 'Nem', fcname:'nem', type: 'select', listname:'Nem'},
      {nev: 'Faj', fcname:'faj', type: 'select', listname:'Fajok'},
      {nev: 'Életkor (év)', fcname:'eletkor', type: 'number'},
      {nev: 'Magasság (cm)', fcname:'magassag', type: 'number'},
      {nev: 'Testsúly (kg)', fcname:'testsuly', type: 'number'},
      {nev: 'Testalkat', fcname:'testalkat', type: 'text', megjegyz: 'Mackós, vagy girhes?'},
      {nev: 'Szemszín', fcname:'szemszin', type: 'color'},
      {nev: 'Bőrszín', fcname:'borszin', type: 'color'},
      {nev: 'Hajszín', fcname:'hajszin', type: 'color'},
      {nev: 'Hajstílus', fcname:'hajstilus', type: 'text', megjegyz: 'Az Árnyak között is fontos!'},
      {nev: 'Szőrzet színe', fcname:'szorszin', type: 'color'},
      {nev: 'Szakáll stílusa', fcname:'szakall', type: 'text', megjegyz: 'Persze csak ha van :p'},
      {nev: 'Félelem', fcname:'felelem', type: 'text', megjegyz: 'Mindenki fél valamitől...'},
      {nev: 'Ösztönző', fcname:'osztonzo', type: 'text', megjegyz: 'De van, ami képes bátorítani!'},
      {nev: 'Gyűlölet', fcname:'gyulolet', type: 'text', megjegyz: 'Ne a gyűlölet vezéreljen...'},
      {nev: 'Kedvenc', fcname:'kedvenc', type: 'text', megjegyz: 'Hanem ami boldoggá tesz!'},
      {nev: 'Írtózat', fcname:'irtozat', type: 'text', megjegyz: 'Lehet, mástól kifordul a beled...'},
      {nev: 'Vonzalom', fcname:'vonzalom', type: 'text', megjegyz: 'De ennek te sem tudsz ellenállni!'},
    ];
  }

getDetails(fcname: string) {
  return this.detailsForm.get(fcname)?.value;
}

addDetails() {
  this.hideMe = !this.hideMe;
}

listGetter(target:string) {
  if (target == 'Fajok') {
    const list = Fajok.map(x=> x.fajnev);
    return list;
  };
  if (target == 'Nem') {
    const list = Nemek.map(x=> x.nem);
    return list;
  };
  if (target == 'Kor') {
    const age = Fajok.find(x => x.fajnev == 'Ember').defAge;
    return Array.from({length: age+6}, (_, i) => i + age/2);
  };

  return;
}

  ngOnInit(): void {
  }
}
