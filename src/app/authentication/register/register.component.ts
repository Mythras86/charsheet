import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  regUserForm!: FormGroup;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.regUserForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'useremail': new FormControl(null, Validators.required),
      'userpass': new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    var form = this.regUserForm;
    if (form.invalid) {
      return;
    }
    this.authService.registerUser(form.value.username, form.value.useremail, form.value.userpass);
  }

}
