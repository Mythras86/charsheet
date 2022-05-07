import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Char } from '../char.model';
import { CharService } from '../chars.service';
import { AuthService } from 'src/app/authentication/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listchars',
  templateUrl: './listchars.component.html',
  styleUrls: ['./listchars.component.css']
})
export class ListcharsComponent implements OnInit, OnDestroy {

  chars: Char[] = [];
  isLoading = false;
  userIsAuthenticated = false;
  userId!: string;
  private charsSub!: Subscription;
  private authStatusSub!: Subscription;

  constructor(
    public charService: CharService,
    private authService: AuthService,
    private router: Router,
    ) {}

  gotoNewChar() {
    (<any>this.router).navigate(["/newchar"]);
  }

  ngOnInit() {
    this.isLoading = true;
    this.charService.getChars();
    this.userId = this.authService.getUserId();
    this.charsSub = this.charService
      .getCharsUpdateListener()
      .subscribe((charData: {chars: Char[]}) => {
        this.isLoading = false;
        this.chars = charData.chars;
      });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated;
        this.userId = this.authService.getUserId();
      });
  }

  onDelete(charId: string) {
    this.isLoading = true;
    this.charService.deleteOneChar(charId).subscribe(() => {
      this.charService.getChars();
    }, () => {
      this.isLoading = false;
    });
  }

  ngOnDestroy() {
    this.charsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
