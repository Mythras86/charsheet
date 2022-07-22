import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { CyberslistModalComponent } from 'src/app/modals/cyberslist-modal/cyberslist-modal.component';
import { ModalService } from 'src/app/modals/modal.service';
import { CyberneticsService } from 'src/app/pages/Cyberworld/Cybernetics/cybernetics/cybernetics.service';
import { ResourcesService } from '../char-resources/resources.service';
import { CharCyberneticsService } from './char-cybernetics.service';

@Component({
  selector: 'app-char-cyberworld',
  templateUrl: './char-cyberworld.component.html',
  styleUrls: ['./char-cyberworld.component.css']
})
export class CharCyberworldComponent implements OnInit {

  @Input() cyberworldForm!: FormGroup

  constructor(
    private changeDetector: ChangeDetectorRef,
    private modalService: ModalService,
    public resServ: ResourcesService,
    public charCyberServ: CharCyberneticsService,
    public cyberServ: CyberneticsService,
    ) { }

  public yourMoney:number = 0;
  public hideMe:boolean = true;

  toggleHide():boolean {
    return this.hideMe = !this.hideMe;
  }

  public get cybernetics(): FormArray | null {
    if(!this.cyberworldForm) {
      return null;
    }
    return this.cyberworldForm.controls.cybernetics as FormArray;
  }

  getFormcontrol(i: number, arrayname: string, controlname:string) {
    let fc = ((this.cyberworldForm.get(arrayname) as FormArray).at(i) as FormGroup).get(controlname);
    return fc;
  }

  addNewCyber(faName: string):void {
    if(faName == 'cybernetics') {
      this.modalService.openModal(CyberslistModalComponent, null).subscribe(w => this.onAddNewCyber(w, faName));
    }
    return;
  }

  onAddNewCyber(id: string, faName:string) {
    if (id == 'none') {
      return;
    }
    if(faName == 'cybernetics') {
      this.cybernetics?.push(this.charCyberServ.addCybernetic(id));
    }
    return;
  }

  removeCyber(i:number, faName:string): void {
    (this.cyberworldForm.get(faName) as FormArray).removeAt(i);
  }

  getDetails(i: number, fckey: string, faName: string):any {
    let detail = ((this.cyberworldForm.get(faName) as FormArray).at(i) as FormGroup).get(fckey)?.value;
    return detail;
  }

  getCyberSubTotal(i: number, tag:string):number {
    const cyber = ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cybernetic' +tag)?.value;
    const level = ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticLevel')?.value;
    const quality = ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticQuality')?.value;
    const total = cyber * level;
    if (tag == 'Price') {
      if (quality == 'alfa') {
        ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total*2);
        return Math.round(total*2);
      }
      if (quality == 'beta') {
        ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total*4);
        return Math.round(total*4);
      }
      if (quality == 'delta') {
        ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total*8);
        return Math.round(total*8);
      }
      ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total);
      return Math.round(total);
    }
    if (quality == 'alfa') {
      ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total*0.8);
      return Math.round((total*0.8 + Number.EPSILON) * 100) / 100;
    }
    if (quality == 'beta') {
      ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total*0.6);
      return Math.round((total*0.6 + Number.EPSILON) * 100) / 100;
    }
    if (quality == 'delta') {
      ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total*0.4);
      return Math.round((total*0.4 + Number.EPSILON) * 100) / 100;
    }
    ((this.cyberworldForm.get('cybernetics') as FormArray).at(i) as FormGroup).get('cyberneticTotal'+tag)?.patchValue(total);
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  getSum(tag:string):number | null {
    const cybernetics = (this.cyberworldForm.get('cybernetics') as FormArray).value.reduce((prev: number, next:number) => prev + +next['cyberneticTotal'+tag], 0);
    const total = cybernetics;
    if (tag == 'Price') {
      return Math.round(total);
    }
    return Math.round((total + Number.EPSILON) * 100) / 100;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.cyberServ.getCybernetics().subscribe({
      next: (w) => {
        this.cyberServ.cybersList = w;
      }
    });
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
