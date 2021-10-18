import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AnswerSurveyComponent } from './answer-survey/answer-survey.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: LandingComponent
  }, {
    path: "login",
    component: LoginComponent
  },
  {
    path: "answer-survey",
    component: AnswerSurveyComponent
  },
  {
    path: 'admin', 
    canActivate: [AuthGuard],
    component: AdminComponent, 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
