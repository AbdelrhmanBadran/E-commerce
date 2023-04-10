import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { NotFoundComponent } from '../components/not-found/not-found.component';

const routes: Routes = [
  {path:'' , redirectTo:'change' , pathMatch:'full'},
  {path:'change' , component:ChangePasswordComponent},
  {path:'reset' , component:ResetPasswordComponent},
  {path:'**' , component:NotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
