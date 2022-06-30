import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { map } from "rxjs/operators";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { newChar } from './newchar.model';
import { Char } from './char.model';
import { EventEmitter } from '@angular/core';

const BACKEND_URL = environment.apiUrl + "/chars/";

@Injectable({ providedIn: "root" })
export class CharService {
  private chars: Char[] = [];
  private charsUpdated = new Subject<{ chars: Char[]}>();

  constructor(private http: HttpClient, private router: Router) {}

  getChars() {
    this.http
      .get<{ message: string; chars: any}>(BACKEND_URL + "list")
      .pipe(
        map(charsData => {
          return {
            chars: charsData.chars.map((char: {
              _id: string;
              creator: string;
              //details
              charName: string;
              charClass: string;
              charDesc: string;
              //attributes
              charEro: string;
              charRef: string;
              charUgy: string;
              charAll: string;
              //eqiupment
              charEqu: string;
              //weapon
              charFegyver: string;
             }) => {
              return {
                id: char._id,
                creator: char.creator,
                  //details
                charName: char.charName,
                charClass: char.charClass,
                charDesc: char.charDesc,
                  //attributes
                charEro: char.charEro,
                charRef: char.charRef,
                charUgy: char.charUgy,
                charAll: char.charAll,
                //eqiupment
                charEqu: char.charEqu,
                //weapon
                charFegyver: char.charFegyver,
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
      creator: string;
      //details
      charName: string;
      charClass: string;
      charDesc: string;
      //attributes
      charEro: string;
      charRef: string;
      charUgy: string;
      charAll: string;
      //eqiupment
      charEqu: string;
      //weapon
      charFegyver: string;
}>(BACKEND_URL + id);
  }

  addOneChar(
    //details
    charName: string,
    charClass: string,
    charDesc: string,
    //attributes
    charEro: string,
    charRef: string,
    charUgy: string,
    charAll: string,
    //eqiupment
    charEqu: string,
    //weapon
    charFegyver: string,
  ) {
    const charData: newChar = {
        //details
      charName: charName,
      charClass: charClass,
      charDesc: charDesc,
        //attributes
      charEro: charEro,
      charRef: charRef,
      charUgy: charUgy,
      charAll: charAll,
      //eqiupment
      charEqu: charEqu,
      //weapon
      charFegyver: charFegyver,

    };
    this.http.post<{ message: string; char: Char }>(
      BACKEND_URL + "create", charData).subscribe(responseData => {
        this.router.navigate(["/characters"]);
      });
  }

  updateOneChar(
    id: string,
    creator: string,
    //details
    charName: string,
    charClass: string,
    charDesc: string,
    //attributes
    charEro: string,
    charRef: string,
    charUgy: string,
    charAll: string,
    //eqiupment
    charEqu: string,
    //weapon
    charFegyver: string,
  ) {
    let charData: Char;
    charData = {
      id: id,
      creator: creator,
        //details
      charName: charName,
      charClass: charClass,
      charDesc: charDesc,
        //attributes
      charEro: charEro,
      charRef: charRef,
      charUgy: charUgy,
      charAll: charAll,
      //eqiupment
      charEqu: charEqu,
      //weapon
      charFegyver: charFegyver,
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
