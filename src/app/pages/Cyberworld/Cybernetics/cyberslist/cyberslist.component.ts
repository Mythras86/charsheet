import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { CyberneticsService } from '../cybernetics/cybernetics.service';

@Component({
  selector: 'app-cyberslist',
  templateUrl: './cyberslist.component.html',
  styleUrls: ['./cyberslist.component.css']
})
export class CyberslistComponent implements OnInit {

  constructor(
    public cybersServ: CyberneticsService,
    private router: Router,
  ) { }

  @Output() onCyberneticSelected = new EventEmitter<string>();

  @Input() selectionMode: boolean = false;
  sortMeFilter: string = 'none';

  public cyberneticId:string = '';

  sortMeBy(categ: string):void {
    this.sortMeFilter = categ;
  }

  getCyberneticCats(): Array<any> | null {
    const categs = [...new Set(this.cybersServ.cybersList.map(x=> x.cyberneticCategory))];
    return categs;
  }

  getCyberneticCatsFiltered(): Array<any> | null {
    if(this.sortMeFilter == 'none') {
      let categs = [...new Set(this.cybersServ.cybersList.map(x=> x.cyberneticCategory))];
      return categs;
    }
    let categs = [...new Set(this.cybersServ.cybersList.filter(x=>x.cyberneticCategory == this.sortMeFilter).map(x=>x.cyberneticCategory))];
    return categs;
  }

  getCybernetics(categ: string): Array<any> | null {
    const filteredcybernetic = this.cybersServ.cybersList.filter(x => x.cyberneticCategory == categ);
    return filteredcybernetic;
  }

  sendCyberneticID(id: string) {
    this.onCyberneticSelected.next(id);
  }

  gotoNewCybernetic() {
    (<any>this.router).navigate(["/newcybernetic"]);
  }

  gotoUpdate(id:string) {
    (<any>this.router).navigate(["/cyberneticedit/"+id]);
  }

  ngOnInit():void {
    this.cybersServ.getCybernetics().subscribe({
      next: (w) => {
        this.cybersServ.cybersList = w;
      }
    });
  }

}
