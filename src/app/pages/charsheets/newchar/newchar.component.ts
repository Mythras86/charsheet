import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/authentication/auth.service';
import { CharService } from '../chars.service';

@Component({
  selector: 'app-newchar',
  templateUrl: './newchar.component.html',
  styleUrls: ['./newchar.component.css']
})
export class NewcharComponent implements OnInit {

  isLoading = false;

  newCharForm!: FormGroup;

  constructor(public charService: CharService) { }

  ngOnInit(): void {
    this.newCharForm = new FormGroup({
      'charName': new FormControl(null, Validators.required),
      'charClass': new FormControl(null, Validators.required),
      'charDesc': new FormControl(null, Validators.required),
    });
  }

  createNewChar() {
    var form = this.newCharForm;
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    this.charService.addOneChar(form.value.charName, form.value.charClass, form.value.charDesc);
  }

}
