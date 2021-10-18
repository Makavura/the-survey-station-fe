import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AdminComponent } from './admin/admin.component';
import { SurveysService } from './services/surveys.service';
import { AuthService } from './services/auth.service';
import { SurveysComponent } from './surveys/surveys.component';
import { FormlyModule } from '@ngx-formly/core';
//@ts-ignore
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { HttpJWTInterceptor } from './http.interceptor';
import { AnswerSurveyComponent } from './answer-survey/answer-survey.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    LoginComponent,
    AdminComponent,
    SurveysComponent,
    AnswerSurveyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormlyModule.forRoot({ extras: { lazyRender: true } }),
    FormlyBootstrapModule,
  ],
  providers: [
    SurveysService,
    AuthService,
    {
      provide: HTTP_INTERCEPTORS, 
      useClass: HttpJWTInterceptor, 
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
