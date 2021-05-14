import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { DataentryComponent } from './dataentry/dataentry.component';
import { WellnesstableComponent } from './wellnesstable/wellnesstable.component';
import { EmpsummaryComponent } from './empsummary/empsummary.component';
import { AboutComponent } from './about/about.component';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { SurveyComponent } from './survey/survey.component';
import { SentimentComponent } from './sentiment/sentiment.component'
import { IgxPieChartModule } from 'igniteui-angular-charts';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { WellnesssProgrammComponent } from './wellnesss-programm/wellnesss-programm.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DataentryComponent,
    WellnesstableComponent,
    EmpsummaryComponent,
    AboutComponent,
    SurveyComponent,
    SentimentComponent,
    WellnesssProgrammComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    IgxPieChartModule,
    NgApexchartsModule,
    MatTableModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
