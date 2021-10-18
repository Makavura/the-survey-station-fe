import { Component, OnInit } from '@angular/core';
import { SurveysService } from '../services/surveys.service';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
@Component({
  selector: 'app-answer-survey',
  templateUrl: './answer-survey.component.html',
  styleUrls: ['./answer-survey.component.css']
})
export class AnswerSurveyComponent implements OnInit {
  surveys: any = [];
  activeSurveyId!: any;
  activeSurvey!: any;
  respondingToSurvey!: boolean;
  form = new FormGroup({});
  model!: any;
  fields: FormlyFieldConfig[] = [ ];

  constructor(
    private surveysService: SurveysService,
    private fb: FormBuilder,
  ) { 
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadSurveys()
    
  }

  loadSurveys() {
    return this.surveysService
      .fetchAllSurveys().subscribe((surveys) => {
        this.surveys = surveys;
        return this.surveys
      }, (err) => { console.warn(err) });
  }

  respondToSurvey(surveyId: any) {
    this.activeSurveyId = surveyId;
    this.surveys.forEach((survey: any) => {
      if (survey["_id"] == surveyId) {
        this.activeSurvey = survey
        this.fields = this.activeSurvey["questions"]
        this.respondingToSurvey = true;
        this.activeSurvey && this.respondingToSurvey;
      }
    });
  }

  backToSurveys(){
    this.respondingToSurvey = false;
    return this.respondingToSurvey;
  }

  onSubmitSurvey(){ 
    let response = {
      responses: []
    }
    Object.keys(this.form.value).forEach((key) => {
      if(!['name', 'phone', 'email'].some(_key => key.includes(_key))){
        let _  = {
          option: key,
          response: this.form.value[`${key}`]
        }
        delete this.form.value[`${key}`]
        //@ts-ignore
        response['responses'].push(_)
      }
    })
    //@ts-ignore
    response["contact"] = this.form.value
    this.activeSurvey["responses"] = this.activeSurvey["responses"].concat(response);
    this.surveysService.respondToSurvey(this.activeSurvey).subscribe((response) => {
      this.form.reset()
    }, (error) => console.warn(error));
  };
}
