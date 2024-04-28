import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, timer, Observable } from 'rxjs';
import { HostListener } from '@angular/core';

const API_URL = "http://localhost:9902";
const API_URL_FREQ = "http://localhost:9902/freq";
const update_frequency = 250; // ms

interface DataPoint {
  x: number; // frequency
  y: number; // amplitude
}
interface IData {
  a: number; // amplitude
}
interface IFreq {
    f: number; // frequency
}

@Component({
  selector: 'app-acoustic',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    HttpClientModule
  ],
  templateUrl: './acoustic.component.html',
  styleUrl: './acoustic.component.css'
})
export class AcousticComponent implements AfterViewInit, OnDestroy {
  constructor(
    private router : Router, 
    private elementRef: ElementRef, 
    private http : HttpClient, 
  ) { 
    
  }

  acousticSubscription: Subscription = new Subscription();
  acousticSubscriptionFreq: Subscription = new Subscription();
  timerObsAcoustic!: Observable<number>;
  acousticTimerSubscription!: Subscription;

  canvas: any;
  data: DataPoint[] = [ {
    x: 0,
    y: 0
  }, {
    x: 1280,
    y: 1000
  } ];
  freq: number[] = [];

  chartOptions = {
    interactivityEnabled: true,
    title: {
      text: "Acoustic FFT",
    },
    axisX: {
      type: 'auto',
      title: 'Frequency (Hz)',
      interval: 1000,
      gridColor: '#e0e0e0',
      gridThickness: 1,
    },
    axisY: {
      type: 'auto',
      // logarithmic: true,
      title: 'Amplitude (dB)',
      gridColor: '#e0e0e0',
      gridThickness: 1,
      minimum: 0,
      maximum: 150
    },
    data: [{
      type: "line",
      color: "#00CC00",
      dataPoints: this.data
    }]                
  };

  getChartInstance(chart: object) {
    this.canvas = chart;
    // this.updateData();
  }

  ngAfterViewInit() {
    this.updateFreq(); // one time build frequency list

    this.timerObsAcoustic = timer(100, update_frequency);
    this.acousticTimerSubscription = this.timerObsAcoustic.subscribe(() => {
      this.updateData();
    });
  }

  ngOnDestroy() {
    this.unloadPage();
  }

  @HostListener('window:beforeunload', ['$event'])
  unloadPage() {
    this.acousticSubscription.unsubscribe();
    this.acousticSubscriptionFreq.unsubscribe();
    this.acousticTimerSubscription.unsubscribe();
    console.log("destroyed acoustic subscriptions");
  }

  // makes an HTTP GET request to the API
  private options_getHttp:any = {
    responseType: 'json' as const,
    observe: 'body' as const
  }

  updateFreq = () => {
    this.acousticSubscriptionFreq = this.http.get<IFreq[]>(API_URL_FREQ as string, this.options_getHttp).subscribe({
      next: (response) => {
        this.addFreq(response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
  updateData = () => {
    this.acousticSubscription = this.http.get<IData[]>(API_URL as string, this.options_getHttp).subscribe({
      next: (response) => {
        this.addData(response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
 
  addData = (data:any) => {
    let cntr = 0;
    this.data = [];
    data.forEach((val:IData) => {
      this.data.push({ x: this.freq[cntr++], y: val.a });
    })

    this.updateChartData();
  }
  addFreq = (data:any) => {
    this.freq = [];
    data.forEach((val:IFreq) => {
      this.freq.push(val.f);
    })
  }
  
  updateChartData() {
    this.chartOptions.data[0].dataPoints = this.data;
    this.canvas.render();
  }

}
