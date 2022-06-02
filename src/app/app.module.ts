import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './elements/footer/footer.component';
import { HeaderComponent } from './elements/header/header.component';
import { MainComponent } from './pages/main/main.component';
import { AuthInterceptor } from './authentication/auth-interceptor';
import { LoginComponent } from './authentication/login/login.component';
import { RegisterComponent } from './authentication/register/register.component';
import { SpinnerComponent } from './elements/spinner/spinner.component';
import { ListcharsComponent } from './pages/charsheets/listchars/listchars.component';
import { MainCharComponent } from './pages/charsheets/mainchar/mainchar.component';
import { CharDetailsComponent } from './pages/charsheets/char-sub-forms/char-details/char-details.component';
import { CharAttributesComponent } from './pages/charsheets/char-sub-forms/char-attributes/char-attributes.component';
import { CharEquipmentComponent } from './pages/charsheets/char-sub-forms/char-equipment/char-equipment.component';
import { CharResourcesComponent } from './pages/charsheets/char-sub-forms/char-resources/char-resources.component';
import { CharSkillsComponent } from './pages/charsheets/char-sub-forms/char-skills/char-skills.component';
import { LevelcontrolComponent } from './elements/levelcontrol/levelcontrol.component';
import { CharWeaponsComponent } from './pages/charsheets/char-sub-forms/char-weapons/char-weapons.component';
import { WeaponsComponent } from './pages/Armory/Weapons/weapons/weapons.component';
import { WeaponAddonsComponent } from './pages/Armory/Weapons/weapon-addons/weapon-addons.component';
import { WeaponsListComponent } from './pages/Armory/Weapons/weaponslist/weaponslist.component';
import { WeaponAddonslistComponent } from './pages/Armory/Weapons/weapon-addonslist/weapon-addonslist.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    MainCharComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    SpinnerComponent,
    ListcharsComponent,
    CharDetailsComponent,
    CharAttributesComponent,
    CharEquipmentComponent,
    CharResourcesComponent,
    CharSkillsComponent,
    LevelcontrolComponent,
    CharWeaponsComponent,
    WeaponsComponent,
    WeaponAddonsComponent,
    WeaponsListComponent,
    WeaponAddonslistComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  exports: [],
})
export class AppModule { }
