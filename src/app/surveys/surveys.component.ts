import { Component, OnInit } from '@angular/core';
import { ISurvey, SurveysService } from '../services/surveys.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent implements OnInit {

  constructor(
    private surveysService: SurveysService
  ) { }

  ngOnInit(): void {
    this.loadSurveys();
  }

  loadSurveys(){
    this.surveysService.fetchAllSurveys().subscribe((response) => {
      console.log(response)     
    })
  }

}
