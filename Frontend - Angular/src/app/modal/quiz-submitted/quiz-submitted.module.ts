import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSubmittedComponent } from './quiz-submitted.component';
import { RouterModule, Routes } from '@angular/router';
import { QuizComponent } from '../../student/quiz/quiz.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button'

const quizcomponent: Routes = [{ path: '', component: QuizComponent }];

@NgModule({
  declarations: [
    QuizSubmittedComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    RouterModule.forChild(quizcomponent),
  ]
})
export class QuizSubmittedModule { }
