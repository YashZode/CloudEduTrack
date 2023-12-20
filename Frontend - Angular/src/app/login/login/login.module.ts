import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import {FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

const login: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    RouterModule.forChild(login),
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class LoginModule { }
