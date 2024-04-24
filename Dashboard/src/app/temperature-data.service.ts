import { Injectable } from '@angular/core';

type DataPoint = {
  x: number;
  y: number;
};

@Injectable({
  providedIn: 'root'
})
export class TemperatureDataService {

  constructor() { }

  temperatureData:DataPoint[] = [{
    x: 0,
    y: 0
  }];

  setData(data:DataPoint[]) {
    this.temperatureData = data;
  }

  getData():DataPoint[] {
    console.log("get");
    console.log(this.temperatureData);
    return this.temperatureData;
  }
}
