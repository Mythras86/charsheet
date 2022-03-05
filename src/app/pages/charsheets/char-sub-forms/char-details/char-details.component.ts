import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-details',
  templateUrl: './char-details.component.html',
  styleUrls: ['./char-details.component.css']
})
export class CharDetailsComponent implements OnInit {

  @Input() charForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }
}
