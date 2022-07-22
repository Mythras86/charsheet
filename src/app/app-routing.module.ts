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
import { ArmorAddonslistComponent } from "./pages/Armory/Armors/armor-addonslist/armor-addonslist.component";
import { ArmorAddonsComponent } from "./pages/Armory/Armors/armor-addons/armor-addons.component";
import { EquipmentComponent } from "./pages/Armory/Equipment/equipments/equipment.component";
import { EquipmentslistComponent } from "./pages/Armory/Equipment/equipmentslist/equipmentslist.component";
import { CyberslistComponent } from "./pages/Cyberworld/Cybernetics/cyberslist/cyberslist.component";
import { CyberneticsComponent } from "./pages/Cyberworld/Cybernetics/cybernetics/cybernetics.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},

  { path: "characters", component: ListcharsComponent },
  { path: "newchar", component: MainCharComponent},
  { path: "charedit/:id", component: MainCharComponent},

  { path: "weaponslist", component: WeaponsListComponent},
  { path: "newweapon", component: WeaponsComponent},
  { path: "weaponedit/:id", component: WeaponsComponent},

  { path: "weaponaddonslist", component: WeaponAddonslistComponent},
  { path: "newweaponaddon", component: WeaponAddonsComponent},
  { path: "weaponaddonedit/:id", component: WeaponAddonsComponent},

  { path: "armorslist", component: ArmorslistComponent},
  { path: "newarmor", component: ArmorsComponent},
  { path: "armoredit/:id", component: ArmorsComponent},

  { path: "armoraddonslist", component: ArmorAddonslistComponent},
  { path: "newarmoraddon", component: ArmorAddonsComponent},
  { path: "armoraddonedit/:id", component: ArmorAddonsComponent},

  { path: "equipmentslist", component: EquipmentslistComponent},
  { path: "newequipment", component: EquipmentComponent},
  { path: "equipmentedit/:id", component: EquipmentComponent},

  { path: "cyberneticslist", component: CyberslistComponent},
  { path: "newcybernetic", component: CyberneticsComponent},
  { path: "cyberneticedit/:id", component: CyberneticsComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
