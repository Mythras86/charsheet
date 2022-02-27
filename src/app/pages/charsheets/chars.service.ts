import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { newChar } from './newchar.model';
import { Char } from './char.model';

const BACKEND_URL = environment.apiUrl + "/chars/";

@Injectable({ providedIn: "root" })
export class CharService {
  private chars: Char[] = [];
  private charsUpdated = new Subject<{ chars: Char[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getChars() {
    this.http
      .get<{ message: string; chars: any}>("http://localhost:3000/api/chars/charslist")
      .pipe(
        map(charsData => {
          return {
            chars: charsData.chars.map((char: { charName: string; charClass: string; _id: string; charDesc: string; creator: string; }) => {
              return {
                charName: char.charName,
                charClass: char.charClass,
                id: char._id,
                charDesc: char.charDesc,
                creator: char.creator
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
      charName: string;
      charClass: string;
      charDesc: string;
      creator: string;
    }>(BACKEND_URL + id);
  }

  addOneChar(charName: string, charClass: string, charDesc: string) {
    const charData: newChar = {charName: charName, charClass: charClass, charDesc: charDesc};
    this.http.post<{ message: string; char: Char }>(
      BACKEND_URL + "create", charData).subscribe(responseData => {
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
        creator: ""
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
