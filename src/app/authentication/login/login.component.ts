import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUser!: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.loginUser = new FormGroup({
      'useremail': new FormControl (null, Validators.required),
      'userpass': new FormControl (null, Validators.required),
    });
  }

  onLogin() {
    console.log(this.loginUser);
  }

}
