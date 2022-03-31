import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { Fajok } from '../char-races'

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
      {nev: 'Teljes név', fcname:'teljesnev', type: 'text'},
      {nev: 'Becenév', fcname:'becenev', type: 'text'},
      {nev: 'Álnév', fcname:'alnev', type: 'text'},
      {nev: 'Nem', fcname:'nem', type: 'text'},
      {nev: 'Faj', fcname:'faj', type: 'select'},
      {nev: 'Születésnap', fcname:'eletkor', type: 'date'},
      {nev: 'Magasság', fcname:'magassag', type: 'text'},
      {nev: 'Testsúly', fcname:'testsuly', type: 'text'},
      {nev: 'Testalkat', fcname:'testalkat', type: 'text'},
      {nev: 'Szemszín', fcname:'szemszin', type: 'color'},
      {nev: 'Hajszín', fcname:'hajszin', type: 'color'},
      {nev: 'Bőrszín', fcname:'borszin', type: 'color'},
    ];
  }

getDetails(fcname: string) {
  return this.detailsForm.get(fcname)?.value;
}

addDetails() {
  this.hideMe = !this.hideMe;
}

getRaceOptions() {
  const races = Fajok.map(x => x.fajnev);
  return races;
}

  ngOnInit(): void {
  }
}
