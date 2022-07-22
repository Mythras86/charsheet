import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { CyberneticsService } from 'src/app/pages/Cyberworld/Cybernetics/cybernetics/cybernetics.service';

@Injectable({
  providedIn: 'root'
})
export class CharCyberneticsService {

  constructor(
    private fb: FormBuilder,
    public cyberServ: CyberneticsService,
  ) { }

  public selectedCyberID: Subject<string> = new Subject;

  createCyberworld(): FormGroup {
    const cyberForm = {
      cybernetics: this.fb.array([]),
    };
    return this.fb.group(cyberForm);
  }

  addCybernetic(id: string) {

    const cyberForm = this.fb.group({
    cyberneticName: this.cyberServ.cybersList.filter(x=>x.id == id).map(x=>x.cyberneticName)[0],
    cyberneticCategory: this.cyberServ.cybersList.filter(x=>x.id == id).map(x=>x.cyberneticCategory)[0],
    cyberneticPrice: this.cyberServ.cybersList.filter(x=>x.id == id).map(x=>x.cyberneticPrice)[0],
    cyberneticDesc: this.cyberServ.cybersList.filter(x=>x.id == id).map(x=>x.cyberneticDesc)[0],
    cyberneticEssence: this.cyberServ.cybersList.filter(x=>x.id == id).map(x=>x.cyberneticEssence)[0],
    cyberneticMaxLevel: this.cyberServ.cybersList.filter(x=>x.id == id).map(x=>x.cyberneticMaxLevel)[0],
    cyberneticLevel: [1, {value: 1, disabled: false}],
    cyberneticQuality: ['', {value: '', disabled: false}],
    cyberneticTotalPrice: [0, {value: 0, disabled: false}],
    cyberneticTotalEssence: [0, {value: 0, disabled: false}],
    });
    return cyberForm;
  }
}
