import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentNavigationComponent } from './student/student-navigation/student-navigation.component';
import { StudentComponent } from './student/student.component';
import { LoginComponent } from './login/login/login.component';

const routes: Routes = [
  { path: '', loadChildren:()=>
  import('./login/login/login.module').then((m)=> m.LoginModule)},
  {
    path: 'student',
    component: StudentNavigationComponent,

    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./student/dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'quiz/:quiz_name',
        loadChildren: () =>
        import('./student/quiz/quiz.module').then(
          (m) => m.QuizModule
        ),
      },
      {
        path: 'submitted',
        loadChildren: () =>
        import('./modal/quiz-submitted/quiz-submitted.module').then(
          (m) => m.QuizSubmittedModule
        ),
      },
    ]
  }
  ]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
