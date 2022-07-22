import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-levelcontrol',
  templateUrl: './levelcontrol.component.html',
  styleUrls: ['./levelcontrol.component.css']
})
export class LevelcontrolComponent implements OnInit {

  @Input() fcName: any;
  @Input() baseValue: number = 0;
  @Input() prefix: string = '';
  @Input() units: string = '';
  @Input() disableIncrement: boolean = false;
  @Input() disableDecrement: boolean = false;

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
