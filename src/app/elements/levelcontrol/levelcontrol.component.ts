import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.css']
})
export class LevelcontrolComponent implements OnInit {

  @Input() controlName!: string;
  @Input() formName!: FormGroup;
  @Input() baseValue!: number;
  @Input() disableIncrement: boolean = false;
  @Input() disableDecrement: boolean = false;

  constructor() { }



  increment(controlName: string, formName: FormGroup) {
    formName.patchValue({
      [controlName]: formName.get(controlName)!.value*1 + 1,
    });
  }

  decrement(controlName: string, formName: FormGroup) {
    formName.patchValue({
      [controlName]: formName.get(controlName)!.value*1 - 1,
    });
  }

  getFromContValue(controlName: string, formName: FormGroup, baseValue: number) {
    return baseValue + formName.get(controlName)?.value;
  }

  ngOnInit(): void {
  }

}
