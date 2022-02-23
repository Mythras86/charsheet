import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { Char } from './char.model';

const BACKEND_URL = environment.apiUrl + "/chars/";

@Injectable({ providedIn: "root" })
export class CharService {
  private charsArray: Char[] = []
  private charsUpdated = new Subject<{ charsArray: Char[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getChars() {
    this.http.get<{ message: string; char: any; }>(BACKEND_URL)
      .pipe(map(charsData => {
        return {char: charsData.char.map((char: { charName: string; charClass: string; charDesc: string; _id: string; creator: string; }) => {
              return {
                charName: char.charName,
                charClass: char.charClass,
                charDesc: char.charDesc,
                id: char._id,
                creator: char.creator
              };
            })
          };
        })
      )
      .subscribe(transformedCharsData => {
        this.charsArray = transformedCharsData.char;
        this.charsUpdated.next({
          charsArray: [...this.charsArray],
        });
      });
  }

  getCharsUpdateListener() {
    return this.charsUpdated.asObservable();
  }

  getOneChar(id: string) {
    return this.http.get<{
      _id: string;
      charName: string;
      charClass: string;
      charDesc: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addOneChar(charName: string, charClass: string, charDesc: string) {
    const charData = new FormData();
    charData.append("charName", charName);
    charData.append("charClass", charClass);
    charData.append("charDesc", charDesc);
    this.http.post<{ message: string; char: Char }>(BACKEND_URL,charData)
      .subscribe(responseData => {
        this.router.navigate(["/"]);
      });
  }

  updateOneChar(id: any, charName: any, charClass: any, charDesc: any) {
    let charData: Char;
    charData = {
        id: id,
        charName: charName,
        charClass: charClass,
        charDesc: charDesc,
        creator: null as any
      };

    this.http
      .put(BACKEND_URL + id, charData)
      .subscribe(response => {
        this.router.navigate(["/"]);
      });
  }

  deleteOneChar(charId: string) {
    return this.http.delete(BACKEND_URL + charId);
  }
}
