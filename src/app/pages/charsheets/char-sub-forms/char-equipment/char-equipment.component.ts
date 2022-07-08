import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-char-equipment',
  templateUrl: './char-equipment.component.html',
  styleUrls: ['./char-equipment.component.css']
})
export class CharEquipmentComponent implements OnInit {

  @Input() charForm!: FormGroup;

  constructor() { }
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }


  ngOnInit(): void {
  }

}
