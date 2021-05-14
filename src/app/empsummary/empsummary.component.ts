import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import {MonitorService} from '../monitor.service'
import 
{
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-empsummary',
  templateUrl: './empsummary.component.html',
  styleUrls: ['./empsummary.component.scss']
})

export class EmpsummaryComponent implements OnInit{

  @ViewChild("chart") chart: ChartComponent |any;
  public chartOptions : Partial<ChartOptions>|any;

  public summaryGroup: FormGroup|any
  public data:any =[];
  public date:any =[];
  public score:any =[];
  public message:any="";
  public average: any=0;
  public predict: any="";

  constructor(private monitorservice:MonitorService) 
  {}

    onSummary()
    {
      this.monitorservice.tableapi('').subscribe((res: any)=>
      {
        for(let i=0;i<res.length;i++)
        {
          if(res[i].formData.empid == this.summaryGroup.value.empid)
          {
            this.data.push(res[i].formData);
          }
        }
        var sum = 0;
        for( var i = 0; i < this.score.length; i++ ){
            sum += this.score[i];
        }
        this.average = sum/this.score.length;
        let d = this.data.pop()
        this.message = "The Employe Name: "+d.name+" having ID "+d.empid+" has average wellbeing score: "+this.average+".";
        console.log(this.data);
        console.log(this.message);
      })
    }

    onPredict()
    {
      if(this.summaryGroup.valid)
      {
        this.monitorservice.predict(this.summaryGroup.value.empid).subscribe((res: any)=>
        {
          console.log(res.toString());
          this.predict=res.toString();
          alert("Predicted Value = "+ this.predict)
        })
      }
    }

    onclick()
    {
      this.chartOptions = {
        series: [
          {
            name: "Desktops",
            data: this.score
          }
        ],
        chart: {
          height: 350,
          type: "line",
          zoom: {
            enabled: false
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: "straight"
        },
        title: {
          text: "Employee Wellbeing Curve"+" of "+this.summaryGroup.value.empid,
          align: "left"
        },
        grid: {
          row: {
            colors: ["#f3f3f3", "transparent"], 
            opacity: 0.5
          }
        },
        xaxis: {
          categories: this.date
        }
      };
    }
  

  ngOnInit(): void 
  {
    this.initForm();
  }

  initForm()
  {
    this.summaryGroup = new FormGroup
    (
      {
        empid: new FormControl('',[Validators.required]),
      }
    )
  }


  onSubmit() 
  {
    if(this.summaryGroup.valid)
    {
      this.monitorservice.forcast(this.summaryGroup.value).subscribe((res: any)=>
      {
        for(let i=0;i<res.Data.length;i++)
        {
          if(res.Data[i].id == this.summaryGroup.value.empid)
          {
            this.date.push(res.Data[i].date);
            this.score.push(res.Data[i].score);
          }
        }
        console.log(this.date);
        console.log(this.score);
        this.onPredict();
        this.onSummary();
        alert("click chart summary")
      })
    }
  }

  clear()
  {
    while (this.date.length) {
      this.date.pop();
    }
    while (this.score.length) {
      this.score.pop();
    }
    while (this.data.length) {
      this.data.pop();
    }
    this.message="";
    this.average="";
    this.predict="";
    this.onclick();
  }
}
