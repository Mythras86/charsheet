import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-attributes',
  templateUrl: './char-attributes.component.html',
  styleUrls: ['./char-attributes.component.css']
})
export class CharAttributesComponent implements OnInit {

  @Input() charForm!: FormGroup;

  constructor() { }

  ngOnInit(): void {
  }

}
