import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription, timer, Observable } from 'rxjs';
import { HostListener } from '@angular/core';

const API_URL = "http://localhost:9903";

interface IData {
  time: number; // time
  fft: number[]; // temp
}

@Component({
  selector: 'app-accelerometer',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    CanvasJSAngularChartsModule,
    HttpClientModule
  ],
  templateUrl: './accelerometer.component.html',
  styleUrl: './accelerometer.component.css'
})
export class AccelerometerComponent implements AfterViewInit, OnDestroy {
  constructor(
    private router : Router, 
    private elementRef: ElementRef, 
    private http : HttpClient, ) {

  }
  
  update_frequency = 250; // ms
  @ViewChild('tileContainer') tileContainer!: ElementRef
  frequency_bins = 128;
  time_bins = 256;
  data: number[][] = []; // fft data

  accelSubscription: Subscription = new Subscription();
  timerSubscription!: Subscription;
  timerObs!: Observable<number>;
  ngAfterViewInit() {
    this.timerObs = timer(100, this.update_frequency); // Create a timer that emits every 1000 milliseconds
    this.timerSubscription = this.timerObs.subscribe(() => {
      this.updateData();
    });
  }
  ngOnDestroy() {
    this.unloadPage();
  }
  @HostListener('window:beforeunload', ['$event'])
  unloadPage() {
    this.accelSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
    console.log("destroyed accelerometer subscriptions");
  }

  private renderHeatmap() {
    this.tileContainer.nativeElement.style.gridTemplateColumns = `repeat(${this.time_bins}, 1fr)`; // set grid of tiles' tile width in container
    this.tileContainer.nativeElement.style.gridTemplateRows = `repeat(${this.frequency_bins}, 1fr)`; // set grid of tiles' tile width in container
    this.tileContainer.nativeElement.innerHTML = '';
    for (let i = 0; i < this.frequency_bins; i++) {
      for (let j = 0; j < this.time_bins; j++) {
        let val = this.getData(i,j);
        const tile = document.createElement('tile');
        tile.style.backgroundColor = this.colorGradient(val / 100);
        // tile.style.backgroundColor = '#17002d';
        // tile.style.border = '1px solid white';
        // tile.innerHTML = '0';
        tile.style.aspectRatio = '1';
        this.tileContainer.nativeElement.appendChild(tile);
      }
    }
    console.log('renderHeatmap done');
  }


  private getData(freq:number, time:number) {
    return this.data[time][freq];
  }

  private options_getHttp:any = {
    responseType: 'json' as const,
    observe: 'body' as const
  }
  getConfig() {
    return this.http.get<IData[]>(API_URL as string, this.options_getHttp);
  }
  updateData = () => {
    this.accelSubscription = this.getConfig().subscribe({
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
    this.data = [];
    data.forEach( (val:IData) => {
      // console.log(val);
      this.data.push(val.fft);

    })
    this.renderHeatmap();
  }
  
  private colorGradient(fadeFraction:number) {
    let color1 = {
      red: 24, green: 0, blue: 46
    };
    let color2 = {
      red: 214, green: 0, blue: 61
    };
    let color3 = {
      red: 209, green: 185, blue: 2
    };

    var fade = fadeFraction * 2;
    if (fade >= 1) {
      fade -= 1;
      color1 = color2;
      color2 = color3;
    }

    var diffRed = color2.red - color1.red;
    var diffGreen = color2.green - color1.green;
    var diffBlue = color2.blue - color1.blue;

    var gradient = {
      red: Math.floor(color1.red + (diffRed * fade)),
      green: Math.floor(color1.green + (diffGreen * fade)),
      blue: Math.floor(color1.blue + (diffBlue * fade)),
    };

    return 'rgb(' + gradient.red + ',' + gradient.green + ',' + gradient.blue + ')';
  }

  private transpose(matrix:number[][]) {
    for (var i = 0; i < matrix.length; i++) {
      for (var j = 0; j < i; j++) {
        const temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
    }
    return matrix;
  }
}
