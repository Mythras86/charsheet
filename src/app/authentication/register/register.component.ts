import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerUser!: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.registerUser = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'useremail': new FormControl(null, Validators.required),
      'userpass': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    console.log(this.registerUser);
  }

}
