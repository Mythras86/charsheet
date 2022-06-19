import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormControlName, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.css']
})
export class LevelcontrolComponent implements OnInit {

  @Input() fcName: any;
  @Input() baseValue: number = 0;
  @Input() disableIncrement: boolean = false;

  constructor() { }

  getFcValue():number {
    return this.fcName.value + this.baseValue;
  }

  increment():void {
    let newValue = this.fcName.value+1;
    this.fcName.patchValue(newValue);
  }

  decrement():void {
    let newValue = this.fcName.value-1;
    this.fcName.patchValue(newValue);

  }

  ngOnInit(): void {
  }

}
