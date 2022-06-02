import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { ListcharsComponent } from "./pages/charsheets/listchars/listchars.component";
import { MainCharComponent } from "./pages/charsheets/mainchar/mainchar.component";
import { WeaponsComponent } from "./pages/Armory/Weapons/weapons/weapons.component";
import { WeaponAddonsComponent } from "./pages/Armory/Weapons/weapon-addons/weapon-addons.component";
import { WeaponsListComponent } from "./pages/Armory/Weapons/weaponslist/weaponslist.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "characters", component: ListcharsComponent },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},

  { path: "newchar", component: MainCharComponent},

  { path: "weaponslist", component: WeaponsListComponent},
  { path: "newweapon", component: WeaponsComponent},
  { path: "edit/:weaponId", component: WeaponsComponent},
  { path: "newaddon", component: WeaponAddonsComponent},
  { path: "edit/:addonId", component: WeaponAddonsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
