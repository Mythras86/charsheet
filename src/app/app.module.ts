import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './elements/footer/footer.component';
import { HeaderComponent } from './elements/header/header.component';
import { CharsheetsComponent } from './pages/charsheets/charsheets.component';
import { NewcharComponent } from './pages/newchar/newchar.component';
import { MainComponent } from './pages/main/main.component';
import { AuthModule } from './authentication/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    CharsheetsComponent,
    NewcharComponent,
    MainComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
