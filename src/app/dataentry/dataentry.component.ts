import { Component, OnInit } from '@angular/core';
import { FormControl,FormGroup,Validators} from '@angular/forms';
import {MonitorService} from '../monitor.service'

@Component({
  selector: 'app-dataentry',
  templateUrl: './dataentry.component.html',
  styleUrls: ['./dataentry.component.scss']
})
export class DataentryComponent implements OnInit {

  public formGroup: FormGroup|any;

  security:any= [
    {
      "id": "HR001",
      "key": "00000"
    },
    {
      "id": "EMP001",
      "key": "12345"
    },
    {
      "id": "EMP002",
      "key": "54321"
    },
  ]

  public weight:any=[]
  public score:any;

  constructor(private monitorservice:MonitorService) { }

  ngOnInit(): void 
  {
    this.initForm();
  }

  initForm()
  {
    this.formGroup = new FormGroup
    (
      {
        date: new FormControl('',[Validators.required]),
        name: new FormControl('',[Validators.required]),
        empid: new FormControl('',[Validators.required]),
        hrid: new FormControl('',[Validators.required]),

        //hr
        mgrid: new FormControl('',[Validators.required]),
        mgrrev: new FormControl('',[Validators.required]),
        att:new FormControl('',[Validators.required]),
        dur: new FormControl('',[Validators.required]),
        sal:new FormControl('',[Validators.required]),
        loc: new FormControl('',[Validators.required]),
        empstatus: new FormControl('',[Validators.required]),
        profile:new FormControl('',[Validators.required]),
        hire: new FormControl('',[Validators.required]),
        wrksince: new FormControl('',[Validators.required]),
        
        //terms
        concent: new FormControl('',[Validators.required]),
        hrsec: new FormControl('',[Validators.required]),
        empsec:new FormControl('',[Validators.required]),

        //other data
        d1: new FormControl('',[Validators.required]),
        d2: new FormControl('',[Validators.required]),
        d3: new FormControl('',[Validators.required]),
        d4: new FormControl('',[Validators.required]),

        d5: new FormControl('',[Validators.required]),
        d6: new FormControl('',[Validators.required]),
        d7: new FormControl('',[Validators.required]),
        d8: new FormControl('',[Validators.required]),

        d9: new FormControl('',[Validators.required]),
        d10: new FormControl('',[Validators.required]),
        d11: new FormControl('',[Validators.required]),
        d12: new FormControl('',[Validators.required]),

        d13: new FormControl('',[Validators.required]),
        d14: new FormControl('',[Validators.required]),
        d15: new FormControl('',[Validators.required]),
        d16: new FormControl('',[Validators.required]),

        d17: new FormControl('',[Validators.required]),
        d18: new FormControl('',[Validators.required]),
        d19: new FormControl('',[Validators.required]),
        d20: new FormControl('',[Validators.required]),

        d21: new FormControl('',[Validators.required]),
        d22: new FormControl('',[Validators.required]),
        d23: new FormControl('',[Validators.required]),
        d24: new FormControl('',[Validators.required]),

        d25: new FormControl('',[Validators.required]),
        d26: new FormControl('',[Validators.required]),
        d27: new FormControl('',[Validators.required]),
        d28: new FormControl('',[Validators.required]),

        d29: new FormControl('',[Validators.required]),

      }
    )
  }

  public input:any = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

  auth(id:any,key:any)
  {
    for(let i=0;i<this.security.length;i++)
    {
      //console.log(this.security[i].id+" "+this.security[i].ke)
      if(this.security[i].id===id&&this.security[i].key===key)
      {
        console.log(this.security[i].id+" "+this.security[i].key)
        return true;
      }
    }
    return false;
  }
  onSubmit() 
  {
          if(this.formGroup.valid)
          {
            {
              var hrid:any = this.formGroup.value.hrid;
              var empid:any = this.formGroup.value.empid;
              var hrkey:any = this.formGroup.value.hrsec;
              var empkey:any = this.formGroup.value.empsec;
              if(this.auth(hrid,hrkey)==true && this.auth(empid,empkey)==true&& this.formGroup.value.concent==="yes")
              {
                this.monitorservice.weightapi(this.formGroup.value).subscribe((res: any)=>
                {
                    this.changeInput()
                    this.scoreFun(res)
                    console.log(res);
                    this.outputSend();
                }) 
              }
              else
              {
                alert("Either Invalid Credidentials or Not accepted the privacy terms!!");
              }
            }
          }
  }
  scoreFun(res:any)
  {
    var obj:any= JSON.parse(res)
    this.weight = Object.values(obj) 
    var ans = this.sumProducts(this.weight,this.input,this.input.length)
    console.log(ans)
  }

  sumProducts(array1:any, array2:any, size:any) 
  {
    let sum =0;
    for (let index = 0; index < size; index++) 
    {
      sum = sum + array1[index]*array2[index];
    }
    this.score=sum*100
    return sum;
  }

  changeInput()
  {
    var arr = Object.values(this.formGroup.value)
    console.log(arr)
    for(let i=17;i<=45;i++)
      {
        var r:any = arr[i];
        if(r == "yes")
        {this.input[i-17]=1}
        else if(r== "no")
        {this.input[i-17]=0}
        else
        {this.input[i-17]=0.5}
    }
  }

  outputSend()
  {
    var output:any =
    {
      "formData":this.formGroup.value,
      "WellbeingScore":this.score,
      "weightArray":this.weight
    }
    this.monitorservice.dataentryapi(output).subscribe((res: any)=>
    {
      console.log(res);
      alert("sent");
    })
  }
}



