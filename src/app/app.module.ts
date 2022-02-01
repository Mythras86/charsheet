import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChshHeaderComponent } from './elements/chsh-header/chsh-header.component';
import { ChshFooterComponent } from './elements/chsh-footer/chsh-footer.component';
import { FooterComponent } from './elements/footer/footer.component';
import { HeaderComponent } from './elements/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    ChshHeaderComponent,
    ChshFooterComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
