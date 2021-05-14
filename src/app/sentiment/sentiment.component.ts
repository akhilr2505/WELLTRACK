import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import {MonitorService} from '../monitor.service'
import { ChartComponent } from "ng-apexcharts";

import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-sentiment',
  templateUrl: './sentiment.component.html',
  styleUrls: ['./sentiment.component.scss']
})
export class SentimentComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent|any;
  public chartOptions: Partial<ChartOptions>|any;


  public sentimentGroup: FormGroup|any
  public data:any =[];
  public message:any="";

  constructor(private monitorservice:MonitorService) {
  }
  ngOnInit(): void 
  {
    this.initForm();
  }

  initForm()
  {
    this.sentimentGroup = new FormGroup
    (
      {
        handle: new FormControl('',[Validators.required]),
      }
    )
  }


  onSubmit() 
  {
    if(this.sentimentGroup.valid)
    {
      this.monitorservice.social(this.sentimentGroup.value).subscribe((res: any)=>
      {
        console.log(res);
        this.data.push(res.Sentiment.positive)
        this.data.push(res.Sentiment.negative)
        this.data.push(res.Sentiment.neutral)
        this.data.push(res.Tweets.tweets.length)
        alert("Click Analyse")
        if(this.data[0]>this.data[1]&&this.data[0]>this.data[2])
        {
          this.message = "negative mood"
        }
        else if(this.data[1]>this.data[2]&&this.data[1]>this.data[0])
        {
          this.message = "positive mood"
        }
        else
        {
          this.message = "neutral mood"
        }
      })
    }
  }

  onclick()
  {
    console.log(this.data);
    this.chartOptions = {
      series: [this.data[0],this.data[1], this.data[2]],
      chart: {
        width: 380,
        type: "pie"
      },
      labels: ["positive","negative","neutral"],
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }
  
  clear()
  {
    while (this.data.length) {
      this.data.pop();
    }
    this.message="";
    this.onclick();
  }

}
