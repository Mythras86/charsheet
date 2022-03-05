import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-weapons',
  templateUrl: './char-weapons.component.html',
  styleUrls: ['./char-weapons.component.css']
})
export class CharWeaponsComponent implements OnInit {

  @Input() charForm!: FormGroup;

  constructor() {}

  ngOnInit(): void {
  }

}
