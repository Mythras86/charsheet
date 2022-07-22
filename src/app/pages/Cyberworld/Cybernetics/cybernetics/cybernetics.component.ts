import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { FormGroupConfig } from 'src/app/pages/charsheets/char.fgconfing';
import { Cybernetics } from './cybernetics.model';
import { CyberneticsService } from './cybernetics.service';

@Component({
  selector: 'app-cybernetics',
  templateUrl: './cybernetics.component.html',
  styleUrls: ['./cybernetics.component.css']
})
export class CyberneticsComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    public route: ActivatedRoute,
    public router: Router,
    public cybersServ: CyberneticsService
    ) { }

  public newCyberneticForm!: FormGroup;

  public mode:string = 'create';
  public cyberneticId: string = '';

  newCybernetic() {
    const newCybernetic: FormGroupConfig<Cybernetics> = {
      id: ['', {value: '', disabled: false}],
      cyberneticName: ['', {value: '', disabled: false}],
      cyberneticCategory: ['', {value: '', disabled: false}],
      cyberneticMaxLevel: [1, {value: 1, disabled: false}],
      cyberneticPrice: [0, {value: 0, disabled: false}],
      cyberneticEssence: [0, {value: 0, disabled: false}],
      cyberneticDesc: ['', {value: '', disabled: false}],
    };
    return this.fb.group(newCybernetic);
  }

  createNewCybernetic() {
    var form = this.newCyberneticForm;
    if (form.invalid) {
      return;
    }
    this.cybersServ.addOneCybernetic(
      form.value.cyberneticName,
      form.value.cyberneticCategory,
      form.value.cyberneticMaxLevel,
      form.value.cyberneticPrice,
      form.value.cyberneticEssence,
      form.value.cyberneticDesc
      );
  }

  onSubmit() {
    var form = this.newCyberneticForm;
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.cybersServ.addOneCybernetic(
        form.value.cyberneticName,
        form.value.cyberneticCategory,
        form.value.cyberneticMaxLevel,
        form.value.cyberneticPrice,
        form.value.cyberneticEssence,
        form.value.cyberneticDesc
        );
    } else {
      this.cybersServ.updateOneCybernetic(
        this.cyberneticId,
        form.value.cyberneticName,
        form.value.cyberneticCategory,
        form.value.cyberneticMaxLevel,
        form.value.cyberneticPrice,
        form.value.cyberneticEssence,
        form.value.cyberneticDesc
        );
      }
      this.router.navigate(["/cyberneticslist"]);
    }

  backToList() {
    this.router.navigate(["/cyberneticslist"]);
  }

  ngOnInit(): void {
    this.newCyberneticForm = this.newCybernetic();
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if(paramMap.has('id')) {
        this.mode = 'edit';
        this.cyberneticId = paramMap.get('id')!;
        this.cybersServ.getOneCybernetic(this.cyberneticId).subscribe(cyberneticData => {
          this.newCyberneticForm = this.fb.group({
            id: cyberneticData._id,
            cyberneticName: cyberneticData.cyberneticName,
            cyberneticCategory: cyberneticData.cyberneticCategory,
            cyberneticMaxLevel: cyberneticData.cyberneticMaxLevel,
            cyberneticPrice: cyberneticData.cyberneticPrice,
            cyberneticEssence: cyberneticData.cyberneticEssence,
            cyberneticDesc: cyberneticData.cyberneticDesc,
          });
          this.newCyberneticForm.patchValue({
            cyberneticName: this.newCyberneticForm.get('cyberneticName')?.value,
            cyberneticCategory: this.newCyberneticForm.get('cyberneticCategory')?.value,
            cyberneticMaxLevel: this.newCyberneticForm.get('cyberneticMaxLevel')?.value,
            cyberneticPrice: this.newCyberneticForm.get('cyberneticPrice')?.value,
            cyberneticEssence: this.newCyberneticForm.get('cyberneticEssence')?.value,
            cyberneticDesc: this.newCyberneticForm.get('cyberneticDesc')?.value,
          });
        });
      } else {
        this.mode = 'create';
        this.cyberneticId = '';
      }
    });
  }

}
