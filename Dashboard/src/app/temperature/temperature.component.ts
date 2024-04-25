import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, timer, Observable } from 'rxjs';
import { TemperatureDataService } from '../temperature-data.service';

const API_URL = "http://localhost:9901";
const update_frequency = 100; // ms
const chart_window_size = 30 * 1000/update_frequency; // 30 seconds

type DataPoint = {
  x: number;
  y: number;
};

@Component({
  selector: 'app-temperature',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    HttpClientModule,
  ],
  templateUrl: './temperature.component.html',
  styleUrl: './temperature.component.css'
})
export class TemperatureComponent implements AfterViewInit, OnDestroy {
  constructor(
    private router : Router, 
    private elementRef: ElementRef, 
    private http : HttpClient, 
    private temperatureService : TemperatureDataService
  ) {   }

  tempSubscription: Subscription = new Subscription();
  timerObs!: Observable<number>;

  canvas: any;
  data: DataPoint[] = [ ];


  chartOptions = {
    interactivityEnabled: false,
    title: {
      text: "Temperature from API",
    },
    axisX: {
      type: 'auto',
      title: 'Time (seconds)',
      interval: 5,
      gridColor: '#e0e0e0',
      gridThickness: 1
    },
    axisY: {
      type: 'auto',
      // logarithmic: true,
      title: 'Temperature (F)',
      suffix: ' F',
      interval: 10,
      gridColor: '#e0e0e0',
      gridThickness: 1
    },
    data: [{
      type: "line",
      color: "#00CC00",
      dataPoints: this.data
    }]                
  };

  getChartInstance(chart: object) {
    this.canvas = chart;
    this.updateData();
  }

  ngAfterViewInit() {
    let previousData:DataPoint[] = this.temperatureService.getData();
    this.addData(previousData);

    this.timerObs = timer(100, update_frequency); // Create a timer that emits every 1000 milliseconds

    this.timerObs.subscribe(() => {
      this.updateData();
    });
  }

  ngOnDestroy() {
      this.tempSubscription.unsubscribe();
  }

  // makes an HTTP GET request to the API and expects a response of type DataPoint[]
  private options_getHttp:any = {
    responseType: 'json' as const,
    observe: 'body' as const
  }
  getConfig() {
    return this.http.get<DataPoint[]>(API_URL as string, this.options_getHttp);
  }
  updateData = () => {
    this.tempSubscription = this.getConfig().subscribe({
      next: (response) => {
        this.addData(response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
    // console.log("update data from " + API_URL);
  }
 
  addData = (data:any) => {
    // console.log(data);
    data.forEach( (val:DataPoint) => {
      // console.log(val);
      let newData = { x: val.x, y: val.y };
      this.data.push(newData);
      if(this.data.length > chart_window_size) {
        this.data.shift();
      }

      // set color of plot based on temperature
      this.chartOptions.data[0].color = "#036c99";
      if(val.y < 40) this.chartOptions.data[0].color = "#039299";
      else if(val.y < 50) this.chartOptions.data[0].color = "#039988";
      else if(val.y < 60) this.chartOptions.data[0].color = "#039960";
      else if(val.y < 70) this.chartOptions.data[0].color = "#02bd4d";
      else if(val.y < 80) this.chartOptions.data[0].color = "#8fe309";
      else if(val.y < 90) this.chartOptions.data[0].color = "#e3dc09";
      else if(val.y < 100) this.chartOptions.data[0].color = "#e3a909";
      else if(val.y < 110) this.chartOptions.data[0].color = "#e38809";
      else if(val.y < 120) this.chartOptions.data[0].color = "#bd4200";
      else if(val.y < 130) this.chartOptions.data[0].color = "#bd2c00";
      else if(val.y < 140) this.chartOptions.data[0].color = "#bd0900";
      else this.chartOptions.data[0].color = "#7a0050";
    })
    this.updateChartData();
  }
  
  updateChartData() {
    this.canvas.render();
    this.temperatureService.setData(this.data);
  }

}
