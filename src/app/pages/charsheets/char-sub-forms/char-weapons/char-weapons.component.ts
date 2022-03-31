import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-weapons',
  templateUrl: './char-weapons.component.html',
  styleUrls: ['./char-weapons.component.css']
})
export class CharWeaponsComponent implements OnInit {

  @Input() charForm = this.fb.group({
    fegyverLista: this.fb.array([])
  });

  fegyverLista = [];

  constructor(private fb: FormBuilder) {}

  addNewWeapon() {
  }

  getWeapons() {
    return this.charForm.controls["fegyverLista"] as FormArray;
  }

  ngOnInit(): void {
    this.fegyverLista = [];
  }

}
