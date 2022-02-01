import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { CharsheetsComponent } from "./pages/charsheets/charsheets.component";
import { NewcharComponent } from "./pages/newchar/newchar.component";
import { LoginComponent } from "./authentication/login/login.component";
import { RegisterComponent } from "./authentication/register/register.component";

const routes: Routes = [
  { path: "", component: CharsheetsComponent },
  { path: "newchar", component: NewcharComponent},
  { path: "login", component: LoginComponent},
  { path: "register", component: RegisterComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
