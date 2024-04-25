import { Injectable } from '@angular/core';

type DataPoint = {
  x: number;
  y: number;
};

@Injectable({
  providedIn: 'root'
})
export class TemperatureDataService {

  constructor() {
    console.log('starting data service');
  }

  temperatureData:DataPoint[] = [];

  setData(data:DataPoint[]) {
    this.temperatureData = data;
  }

  getData():DataPoint[] {
    console.log("get");
    console.log(this.temperatureData);
    return this.temperatureData;
  }
}
