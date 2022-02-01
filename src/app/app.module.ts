import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChshHeaderComponent } from './elements/chsh-header/chsh-header.component';
import { ChshFooterComponent } from './elements/chsh-footer/chsh-footer.component';

@NgModule({
  declarations: [
    AppComponent,
    ChshHeaderComponent,
    ChshFooterComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
