import { Component, OnInit} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import {MonitorService} from'../monitor.service'

export interface wellnessp
{
  Parameter:string;
  Population:number;
} 



@Component({
  selector: 'app-wellnesss-programm',
  templateUrl: './wellnesss-programm.component.html',
  styleUrls: ['./wellnesss-programm.component.scss']
})
export class WellnesssProgrammComponent implements OnInit {

  public displayedColumns = ['Parameter', 'Population'];
  public dataSource = new MatTableDataSource<wellnessp>(); 
  public data :Array<wellnessp> =[];
  public avgarr =[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
  message = "";
  constructor(private monitorservice:MonitorService) { }

  ngOnInit(): void 
  {
    this.getAllParam();
  }

  public getAllParam = () => {
    this.monitorservice.tableapi('').subscribe(res => 
    {
      for(let i=0;i<res.length;i++)
      {
        var obj = res[i].formData;
        var arr:Array<string> = Object.values(obj);
        //console.log(arr)
        for(let j=17;j<=45;j++)
        {
          var x = (arr[j]==="yes"||arr[j]==="maybe")?1:0;
          this.avgarr[j-17]=this.avgarr[j-17]+(x);
        }
        //console.log(this.avgarr)
        this.avgarr = this.doPercentage(this.avgarr);
        //console.log(this.avgarr)
      }
      var param =["Married","Relationship","Single","JunkFood","FruitsVeggies","Personal Stress","Professional Stress","Business Tour","Personal Tour",
        "Social Active", "Support Nature", "Personal Acievements", "Profesional Achievements", "Sicerity", "Tiredness", "Proper Sleep", "Fitness", "Sickness", 
        "Vacation Opportunity", "Income Sufficiency", "Home nearness", "Higher Study Plan", "ESOP offered", "Seniority in Company","Work Satisfaction",
        "Good W/L balance", "Bad W/L Balance", "High Salary Hike", "Low Salary Hike"];
        for(var k=0;k<29;k++)
        {
          var d = 
          {
            "Parameter":param[k],
            "Population":this.avgarr[k],
          }
          this.data.push(d);
        }
      this.dataSource.data = this.data as wellnessp[];
      console.log(this.dataSource);
      this.message = this.doMessage();
      //console.log(res);
      //console.log(res.length);
    })
  }

  doPercentage(value:any)
  {
    var sum = 0;
    for(var i=0;i<value.length;i++)
    {
      sum = sum+value[i];
    }
    for(var i=0;i<value.length;i++)
    {
      value[i] = value[i]/sum*100;
    }
    return value;
  }

  doMessage()
  {
    var msg =[]

    //marriage wellness programm
    var x = this.avgarr[0];
    var y = this.avgarr[1] + this.avgarr[2];

    if(x>y)
      msg.push("Oragnisation should maintain the policy of Health Insurance for family and Family policy and leaves for married employees because the survey shows that married people are more in your organisation.B'coz Employees family happiness is propotional to Organisation Growth and Profit.")
    else
      msg.push("Unmarried people are more in your organisation so maintain policy of having organisation PG so that they can reside over nearby and their expense would be reduces which ultimately make them wellbeing.")
    
    //food wellness program
    if(this.avgarr[2]>this.avgarr[3])
      msg.push("Employees are found to be more steet food lover. Try to maintain a canteen that serves a healthy cooked food synonymous to street food.")
    else
      msg.push("Employess are found to be salad lover hence provide raw fruits and veggies in your organisation Canteen.")
    
    //health wellness program
    if(this.avgarr[15]>3.5 || this.avgarr[17]>3.5)
      msg.push("Having a music and dance activities and good Gym and Showering System will benifit employess for fitness wellbing.")
    if(this.avgarr[16]<3.5 || this.avgarr[18]>3.5)
      msg.push("Having a good onsite pharma and healthcentre will improve the health wellbeing of the employees.")
    
    //HS program
    if(this.avgarr[22]>3)
      msg.push("It is found that Dominating employees has Higher Study plan hence for their well being organisation can afford Educaion Plocies and Rembursement.")

    //salary hike
    if(this.avgarr[27]>2||this.avgarr[20]>2.5)
      msg.push("It is found that employees are having financial issues hence company should revise the salries with good hikes.")

    msg.push("The below table shows the wellbeing parameter with the average score of each parameter given by all empolyees of your organisation.")

    return msg.toString();
  }

}
