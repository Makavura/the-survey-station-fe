import { Component, OnInit } from '@angular/core';
import { ISurvey, SurveysService } from '../services/surveys.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { AuthService } from '../services/auth.service';
//@ts-ignore
import { uid } from 'uid';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  form = new FormGroup({});
  model!: any;
  fields: FormlyFieldConfig[] = [

  ];
  surveys: any = [];
  showCanvas!: boolean;
  isAdmin!: boolean;
  surveyForm: FormGroup;
  surveyTitle!: string;
  surveyTitleSet!: boolean;
  questionsForm = new FormGroup({});
  questionsFields: FormlyFieldConfig[] = []
  questionsCanvasForm: FormGroup;
  activeSurveyId!: any;
  activeSurvey!: any;
  viewingSurveyReport!: boolean;
  constructor(
    private surveysService: SurveysService,
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.isAdmin = this.authService.getAuthStatus();
    this.surveyForm = this.fb.group({
      title: ['']
    });
    this.questionsCanvasForm = this.fb.group({
      question: [''],
      description: [''],
      label1: [''],
      label2: [''],
    })
  }

  ngOnInit(): void {
    this.showCanvas = false;
    this.loadSurveys();
  }

  addQuestion() {
    let questionId = uid(32)
    let question = {
      id: questionId,
      key: this.questionsCanvasForm.value["question"],
      type: 'radio',
      templateOptions: {
        label: this.questionsCanvasForm.value["question"],
        description: this.questionsCanvasForm.value["description"],
        options: [
          {
            value: 1,
            label: this.questionsCanvasForm.value["label1"]
          },
          {
            value: 2,
            label: this.questionsCanvasForm.value["label2"]
          }
        ],
      }
    }

    this.fields = this.fields.concat(question);
    this.questionsCanvasForm.reset();
    return this.fields;
  }

  createSurvey(survey: ISurvey) {
    console.log(survey)
    this.surveysService.createSurvey(survey).subscribe(
      (res) => {
        return this.router.navigate(['/admin']);
        console.log(res)
      },
      (err) => {
        console.warn(err)
      }
    );
  }

  loadSurveys() {
    return this.surveysService
      .fetchAllSurveys().subscribe((surveys) => {
        this.surveys = surveys;
        return this.surveys
      }, (err) => { console.warn(err) });
  }

  toggleCanvasDisplay(event: any) {
    return this.showCanvas ? this.showCanvas = false : this.showCanvas = true
  }

  onSubmitSurvey() {
    if (this.form.valid) {
      let surveyFields: any[] = [];
      this.fields.forEach((field: any, index: number) => {
        let _ = {
          id: field["id"],
          key: field["key"],
          type: field["type"],
          templateOptions: {
            label: field["templateOptions"]["label"],
            description: field["templateOptions"]["description"],
            options: field["templateOptions"]["options"]
          }
        };
        surveyFields = surveyFields.concat(_);
        return surveyFields;
      })

      const survey: ISurvey = {
        title: this.surveyTitle,
        questions: surveyFields,
        responses: []
      }
      this.createSurvey(survey)
    }
  }

  onSubmitSurveyTitle() {
    this.surveyTitleSet = true;
    this.surveyTitle = this.surveyForm.value["title"]
    return this.surveyTitle && this.surveyTitleSet;
  }

  logOut(){
    this.authService.logout();
    return this.router.navigate(['/']);
  }

  respondToSurvey(surveyId: any) {
    this.activeSurveyId = surveyId;
    this.surveys.forEach((survey: any) => {
      if (survey["_id"] == surveyId) {
        this.activeSurvey = survey
        this.fields = this.activeSurvey["questions"]
        this.viewingSurveyReport = true;
        this.activeSurvey && this.viewingSurveyReport;
      }
    });
  }

  backToSurveys(){
    this.viewingSurveyReport = false;
    return this.viewingSurveyReport;
  }
}
