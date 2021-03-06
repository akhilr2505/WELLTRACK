import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DataentryComponent} from './dataentry/dataentry.component';
import {EmpsummaryComponent} from './empsummary/empsummary.component';
import {WellnesstableComponent} from './wellnesstable/wellnesstable.component';
import {AboutComponent} from './about/about.component';
import { SurveyComponent } from './survey/survey.component'
import {SentimentComponent} from './sentiment/sentiment.component'
import {WellnesssProgrammComponent} from './wellnesss-programm/wellnesss-programm.component'

const routes: Routes = [
  {
    path:'data',component:DataentryComponent
  },
  {
    path:'table',component:WellnesstableComponent
  },
  {
    path:'summary',component:EmpsummaryComponent
  },
  {
    path:'',component: AboutComponent
  },
  {
    path:'survey',component: SurveyComponent
  },
  {
    path:'sentiment',component: SentimentComponent
  },
  {
    path:'program',component: WellnesssProgrammComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
