import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerformanceComponent } from './performance.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from 'src/app/student/dashboard/dashboard.component';
import { MatDialogRef } from '@angular/material/dialog';

const permormanceModal: Routes = [{ path: '', component: DashboardComponent }];

@NgModule({
  declarations: [
    PerformanceComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogRef,
    RouterModule.forChild(permormanceModal),
  ]
})
export class PerformanceModule { }
