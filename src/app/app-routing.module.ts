import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { NewcharComponent } from "./pages/charsheets/newchar/newchar.component";
import { MainComponent } from "./pages/main/main.component";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";
import { ListcharsComponent } from "./pages/charsheets/listchars/listchars.component";

const routes: Routes = [
  { path: "", component: MainComponent },
  { path: "characters", component: ListcharsComponent },
  { path: "newchar", component: NewcharComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
