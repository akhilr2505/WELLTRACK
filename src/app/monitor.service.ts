import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class MonitorService {

  constructor(private http: HttpClient) 
  {
  }
  public weightapi(data: any):Observable<any>
  {
    return this.http.get('https://wellbeing-weights.herokuapp.com/');
  }
  public dataentryapi(data: any):Observable<any>
  {
    return this.http.post('https://employeedatabasesaphack.herokuapp.com/adddata',data);
  }
  public social(data: any):Observable<any>
  {
    return this.http.get('https://twitter-wellbeing.herokuapp.com/?query='+data);
  }
  public tableapi(data: any):Observable<any>
  {
    return this.http.get('https://employeedatabasesaphack.herokuapp.com/readdata');
  }
  public timeseries(data: any):Observable<any>
  {
    return this.http.post('https://timeseries-emp.herokuapp.com/adddata/',data);
  }
  public forcast(data: any):Observable<any>
  {
    return this.http.get('https://timeseries-emp.herokuapp.com/readdata');
  }
}
