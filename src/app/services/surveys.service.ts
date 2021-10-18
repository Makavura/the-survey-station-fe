import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
const baseUrl = 'http://localhost:3000'
@Injectable({
  providedIn: 'root'
})
export class SurveysService {

  constructor(
    private http: HttpClient
  ) { }

  fetchAllSurveys(){
    return this.http.get(`${baseUrl}/api/v1/surveys`);
  }

  fetchSurvey(id: string | number){
    return this.http.get(`${baseUrl}/api/v1/surveys/${id}`);
  }

  respondToSurvey(surveyResponse: ISurvey){
    return this.http.post(`${baseUrl}/api/v1/surveys/response`, surveyResponse);
  }

  createSurvey(survey: ISurvey){
    return this.http.post(`${baseUrl}/api/v1/surveys/create`, survey);
  }

}

export interface ISurvey {
  _id?: string;
  title: string;
  questions: any[];
  responses: any[];
}