import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizComponent } from './quiz.component';
import { RouterModule, Routes } from '@angular/router';
import { Router  } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'
const quizcomponent: Routes = [{ path: '', component: QuizComponent }];

@NgModule({
  declarations: [
    QuizComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(quizcomponent),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
  ]
})
export class QuizModule { }
