import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { Router, RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
const dashboard: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    MatGridListModule,
    MatCardModule,
    MatButtonModule,
    CommonModule,
    RouterModule.forChild(dashboard),
    FormsModule,
    ReactiveFormsModule,
  ]
})
export class DashboardModule { }
