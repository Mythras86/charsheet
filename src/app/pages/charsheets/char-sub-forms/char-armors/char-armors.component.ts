import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ModalService } from 'src/app/modals/modal.service';
import { ArmorsService } from 'src/app/pages/Armory/Armors/armors/armors.service';
import { ResourcesService } from '../char-resources/resources.service';

@Component({
  selector: 'app-char-armors',
  templateUrl: './char-armors.component.html',
  styleUrls: ['./char-armors.component.css']
})
export class CharArmorsComponent implements OnInit {

  @Input() armorsForm!: FormGroup

  constructor(
    private fb: FormBuilder,
    private changeDetector: ChangeDetectorRef,
    public armorServ: ArmorsService,
    public resServ: ResourcesService,
    private modalService: ModalService,
    ) { }

  public yourMoney:number = 0;
  public spentOnWeapons: number = 0;

  public get armors(): FormArray | null {
    if(!this.armorsForm) {
      return null;
    }
    return this.armorsForm.controls.armors as FormArray;
  }

  ngAfterContentChecked(): void {
    this.changeDetector.detectChanges();
  }

  ngOnInit(): void {
    this.armorServ.getArmors().subscribe({
      next: (w) => {
        this.armorServ.armorsList = w;
      }
    });
    // this.addonServ.getAddons().subscribe({
    //   next: (w) => {
    //     this.addonServ.weaponAddonsList = w;
    //   }
    // });
    this.resServ.getMoneyFlow.subscribe(yourMoney => this.yourMoney = yourMoney);
  }

}
