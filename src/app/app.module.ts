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
import { ArmorsComponent } from './pages/Armory/Armors/armors/armors.component';
import { ArmorslistComponent } from './pages/Armory/Armors/armorslist/armorslist.component';
import { WeaponslistModalComponent } from './modals/weaponslist-modal/weaponslist-modal.component';
import { ModalWrapperComponent } from './modals/modal-wrapper.component';
import { ModalService } from './modals/modal.service';
import { WeaponsService } from './pages/Armory/Weapons/weapons/weapons.service';
import { CharWeaponsService } from './pages/charsheets/char-sub-forms/char-weapons/char-weapons.service';
import { AddonslistModalComponent } from './modals/weaponaddonslist-modal/weaponaddonslist-modal.component';
import { ResourcesService } from './pages/charsheets/char-sub-forms/char-resources/resources.service';
import { SkillsService } from './pages/charsheets/char-sub-forms/char-skills/skills.service';
import { WeaponAddonsService } from './pages/Armory/Weapons/weapon-addons/weapon-addons.service';
import { AttributesService } from './pages/charsheets/char-sub-forms/char-attributes/attributes.service';
import { DetailsService } from './pages/charsheets/char-sub-forms/char-details/details.service';
import { ArmorsService } from './pages/Armory/Armors/armors/armors.service';
import { CharArmorsComponent } from './pages/charsheets/char-sub-forms/char-armors/char-armors.component';
import { ArmorAddonsComponent } from './pages/Armory/Armors/armor-addons/armor-addons.component';
import { ArmorAddonsService } from './pages/Armory/Armors/armor-addons/armor-addons.service';
import { ArmorAddonslistComponent } from './pages/Armory/Armors/armor-addonslist/armor-addonslist.component';
import { ArmorslistModalComponent } from './modals/armorslist-modal/armorslist-modal.component';
import { ArmorAddonslistModalComponent } from './modals/armoraddonslist-modal/armoraddonslist-modal.component';

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
    WeaponsListComponent,
    WeaponAddonsComponent,
    WeaponAddonslistComponent,
    ArmorsComponent,
    ArmorslistComponent,
    ArmorslistComponent,
    ArmorAddonsComponent,
    ArmorAddonslistComponent,
    WeaponslistModalComponent,
    ModalWrapperComponent,
    AddonslistModalComponent,
    CharArmorsComponent,
    ArmorslistModalComponent,
    ArmorAddonslistModalComponent,
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
    ModalService,
    WeaponsService,
    CharWeaponsService,
    ResourcesService,
    SkillsService,
    WeaponAddonsService,
    AttributesService,
    DetailsService,
    ArmorsService,
    ArmorAddonsService,
  ],
  bootstrap: [AppComponent],
  exports: [
    CharArmorsComponent,
    ArmorslistModalComponent
  ],
})
export class AppModule { }
