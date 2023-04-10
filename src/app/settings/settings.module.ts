import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingsRoutingModule } from './settings-routing.module';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';


@NgModule({
  declarations: [
    ChangePasswordComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
