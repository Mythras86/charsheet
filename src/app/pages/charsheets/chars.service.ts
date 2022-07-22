import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Char } from './char.model';
import { AuthService } from "src/app/authentication/auth.service";

const BACKEND_URL = environment.apiUrl + "/chars/";

@Injectable({ providedIn: "root" })
export class CharService {
  constructor(
    private http: HttpClient,
    private router: Router,
    public authServ: AuthService,
    ) {}

  private chars: Char[] = [];
  private charsUpdated = new Subject<{ chars: Char[]}>();

  private mainCharFormData:any;

  public setFormData(mainCharFormData: any): void {
    this.mainCharFormData = mainCharFormData;
  }

  public getFormData(): any {
    return this.mainCharFormData;
  }

  getChars() {
    this.http
      .get<{ message: string; chars: any}>(BACKEND_URL + "list")
      .pipe(
        map(charsData => {
          return {
            chars: charsData.chars.map((char: {
              _id: string;
              creatorID: string;
              creatorName: string;
              teljesnev: string,
              becenev:string,
              alnev:string,
              testalkat:string,
              hajstilus:string,
              szakall:string,
              nem: string,
              faj:string,
              anyanyelv: string,
              magikus:string,
              spec:string,
              eletkor:string,
              magassag:string,
              testsuly:string,
              szemszin:string,
              hajszin:string,
              szorszin:string,
              borszin:string,
              felelem:string,
              osztonzo:string,
              gyulolet:string,
              kedvenc:string,
              irtozat:string,
              vonzalom:string,
             }) => {
              return {
                id: char._id,
                creatorID: char.creatorID,
                creatorName: char.creatorName,
                teljesnev: char.teljesnev,
                becenev: char.becenev,
                alnev: char.alnev,
                testalkat: char.testalkat,
                hajstilus: char.hajstilus,
                szakall: char.szakall,
                nem: char.nem,
                faj: char.faj,
                anyanyelv: char.anyanyelv,
                magikus: char.magikus,
                spec: char.spec,
                eletkor: char.eletkor,
                magassag: char.magassag,
                testsuly: char.testsuly,
                szemszin: char.szemszin,
                hajszin: char.hajszin,
                szorszin: char.szorszin,
                borszin: char.borszin,
                felelem: char.felelem,
                osztonzo: char.osztonzo,
                gyulolet: char.gyulolet,
                kedvenc: char.kedvenc,
                irtozat: char.irtozat,
                vonzalom: char.vonzalom,
              };
            }),
          };
        })
      )
      .subscribe(transformedCharsData => {
        this.chars = transformedCharsData.chars;
        this.charsUpdated.next({
          chars: [...this.chars],
        });
      });
  }

  getCharsUpdateListener() {
    return this.charsUpdated.asObservable();
  }

  getOneChar(id: string) {
    return this.http.get<{
      _id: string;
      creatorID: string;
      creatorName: string;
      teljesnev: string,
      becenev:string,
      alnev:string,
      testalkat:string,
      hajstilus:string,
      szakall:string,
      nem: string,
      faj:string,
      anyanyelv: string,
      magikus:string,
      spec:string,
      eletkor:string,
      magassag:string,
      testsuly:string,
      szemszin:string,
      hajszin:string,
      szorszin:string,
      borszin:string,
      felelem:string,
      osztonzo:string,
      gyulolet:string,
      kedvenc:string,
      irtozat:string,
      vonzalom:string,
    }>(BACKEND_URL + id);
  }

  addOneChar(
    teljesnev: string,
    becenev:string,
    alnev:string,
    testalkat:string,
    hajstilus:string,
    szakall:string,
    nem: string,
    faj:string,
    anyanyelv: string,
    magikus:string,
    spec:string,
    eletkor:string,
    magassag:string,
    testsuly:string,
    szemszin:string,
    hajszin:string,
    szorszin:string,
    borszin:string,
    felelem:string,
    osztonzo:string,
    gyulolet:string,
    kedvenc:string,
    irtozat:string,
    vonzalom:string,
    ) {
    const charData: Char = {
      id: '',
      creatorID: '',
      creatorName: this.authServ.username,
      teljesnev: teljesnev,
      becenev: becenev,
      alnev: alnev,
      testalkat: testalkat,
      hajstilus: hajstilus,
      szakall: szakall,
      nem: nem,
      faj: faj,
      anyanyelv: anyanyelv,
      magikus: magikus,
      spec: spec,
      eletkor: eletkor,
      magassag: magassag,
      testsuly: testsuly,
      szemszin: szemszin,
      hajszin: hajszin,
      szorszin: szorszin,
      borszin: borszin,
      felelem: felelem,
      osztonzo: osztonzo,
      gyulolet: gyulolet,
      kedvenc: kedvenc,
      irtozat: irtozat,
      vonzalom: vonzalom,
    };
    this.http.post<{ message: string; char: Char }>(
      BACKEND_URL + "create", charData).subscribe(responseData => {
        this.router.navigate(["/characters"]);
      });
  }

  updateOneChar(
    id: string,
    creatorID: string,
    creatorName: string,
    teljesnev: string,
    becenev:string,
    alnev:string,
    testalkat:string,
    hajstilus:string,
    szakall:string,
    nem: string,
    faj:string,
    anyanyelv: string,
    magikus:string,
    spec:string,
    eletkor:string,
    magassag:string,
    testsuly:string,
    szemszin:string,
    hajszin:string,
    szorszin:string,
    borszin:string,
    felelem:string,
    osztonzo:string,
    gyulolet:string,
    kedvenc:string,
    irtozat:string,
    vonzalom:string,
  ) {
    let charData: Char;
    charData = {
      id: id,
      creatorID: creatorID,
      creatorName: creatorID,
      teljesnev: teljesnev,
      becenev: becenev,
      alnev: alnev,
      testalkat: testalkat,
      hajstilus: hajstilus,
      szakall: szakall,
      nem: nem,
      faj: faj,
      anyanyelv: anyanyelv,
      magikus: magikus,
      spec: spec,
      eletkor: eletkor,
      magassag: magassag,
      testsuly: testsuly,
      szemszin: szemszin,
      hajszin: hajszin,
      szorszin: szorszin,
      borszin: borszin,
      felelem: felelem,
      osztonzo: osztonzo,
      gyulolet: gyulolet,
      kedvenc: kedvenc,
      irtozat: irtozat,
      vonzalom: vonzalom,
    };
      this.http
      .put(BACKEND_URL + id, charData)
      .subscribe(response => {
        this.router.navigate(["/characters"]);
      });
  }

  deleteOneChar(charId: string) {
    return this.http.delete(BACKEND_URL + charId);
  }
}
