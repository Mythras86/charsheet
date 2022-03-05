import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-mainchar',
  templateUrl: './mainchar.component.html',
  styleUrls: ['./mainchar.component.css']
})
export class MainCharComponent implements OnInit {

  isLoading = false;

  charForm!: FormGroup;
  charAttributes!: FormGroup;
  charDetails!: FormGroup;
  charEquipment!: FormGroup;
  charWeapons!: FormGroup;

  constructor(
    public charService: CharService,
    private fb: FormBuilder
    ) { }

  ngOnInit(): void {
    this.charForm = this.fb.group({
        charName: [''],
        charClass: [''],
        charDesc: [''],
        charEro: [''],
        charRef: [''],
        charUgy: [''],
        charAll: [''],
        charEqu: [''],
        charFegyver: [''],
    });
  }

  createNewChar() {
    var form = this.charForm;
    console.log(form);
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.charService.addOneChar(
      //details
      form.value.charName,
      form.value.charClass,
      form.value.charDesc,
      //attributes
      form.value.charEro,
      form.value.charRef,
      form.value.charUgy,
      form.value.charAll,
      //eqiupment
      form.value.charEqu,
      //weapon
      form.value.charFegyver
      );
  }
}
