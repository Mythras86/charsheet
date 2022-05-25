import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { ListcharsComponent } from "./pages/charsheets/listchars/listchars.component";
import { EquipmentsComponent } from "./pages/equipments/equipments.component";
import { MainCharComponent } from "./pages/charsheets/mainchar/mainchar.component";
import { CharNewWeaponComponent } from "./pages/charsheets/char-sub-forms/char-weapons/char-new-weapon/char-new-weapon.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "characters", component: ListcharsComponent },
  { path: "equipments", component: EquipmentsComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},

  { path: "newchar", component: MainCharComponent},
  { path: "newweapon", component: CharNewWeaponComponent},
  { path: "edit/:weaponId", component: CharNewWeaponComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
