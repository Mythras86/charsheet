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
import { WeaponAddonslistComponent } from "./pages/Armory/Weapons/weapon-addonslist/weapon-addonslist.component";
import { ArmorslistComponent } from "./pages/Armory/Armors/armorslist/armorslist.component";
import { ArmorsComponent } from "./pages/Armory/Armors/armors/armors.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "characters", component: ListcharsComponent },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},

  { path: "newchar", component: MainCharComponent},

  { path: "weaponslist", component: WeaponsListComponent},
  { path: "newweapon", component: WeaponsComponent},
  { path: "weaponedit/:weaponId", component: WeaponsComponent},

  { path: "weaponaddonslist", component: WeaponAddonslistComponent},
  { path: "newweaponaddon", component: WeaponAddonsComponent},
  { path: "weaponaddonedit/:addonId", component: WeaponAddonsComponent},

  { path: "armorslist", component: ArmorslistComponent},
  { path: "newarmor", component: ArmorsComponent},
  { path: "armoredit/:armorId", component: ArmorsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
