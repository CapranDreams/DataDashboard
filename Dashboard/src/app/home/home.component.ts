import { Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HttpClientModule,],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit, AfterViewInit {
  title='Home';

  status_camera: boolean;
  status_accelerometer: boolean;
  status_acoustic: boolean;
  status_temperature: boolean;
  status_db: boolean;

  @ViewChild('statusTemperature') statusTemperature!: ElementRef
  @ViewChild('statusCamera') statusCamera!: ElementRef
  @ViewChild('statusAccelerometer') statusAccelerometer!: ElementRef
  @ViewChild('statusAcoustic') statusAcoustic!: ElementRef
  @ViewChild('statusDB') statusDB!: ElementRef

  constructor(
    private elementRef: ElementRef, 
    private http : HttpClient, 
  ) {
    this.status_camera = false;
    this.status_accelerometer = false;
    this.status_acoustic = false;
    this.status_temperature = false;  
    this.status_db = false;    
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.checkStatusCamera();
    this.checkStatusAccelerometer();
    this.checkStatusAcoustic();
    this.checkStatusTemperature();    
    this.checkStatusDB();    
  }

  checkStatusTemperature() {
    const API_URL = "http://localhost:9901";
    const options_getHttp:any = {
      responseType: 'json' as const,
      observe: 'body' as const
    }
    this.http.get<any[]>(API_URL as string, options_getHttp).subscribe({
      next: (response) => {
        this.status_temperature = true;
      },
      error: (error) => {
        this.status_temperature = false;
      }
    });
    // this.statusTemperature.nativeElement.innerHTML = this.status_temperature ? 'Running' : 'Offline';
  }

  checkStatusAccelerometer() {
    const API_URL = "http://localhost:9903";
    const options_getHttp:any = {
      responseType: 'json' as const,
      observe: 'body' as const
    }
    this.http.get<any[]>(API_URL as string, options_getHttp).subscribe({
      next: (response) => {
        this.status_accelerometer = true;
      },
      error: (error) => {
        this.status_accelerometer = false;
      }
    });
    // this.statusAccelerometer.nativeElement.innerHTML = this.status_accelerometer ? 'Running' : 'Offline';
  }

  checkStatusAcoustic() {
    const API_URL = "http://localhost:9902";
    const options_getHttp:any = {
      responseType: 'json' as const,
      observe: 'body' as const
    }
    this.http.get<any[]>(API_URL as string, options_getHttp).subscribe({
      next: (response) => {
        this.status_acoustic = true;
      },
      error: (error) => {
        this.status_acoustic = false;
      }
    });
    // this.statusAcoustic.nativeElement.innerHTML = this.status_acoustic ? 'Running' : 'Offline';
  }

  checkStatusCamera() {
    const API_URL = "http://localhost:9904";
    const options_getHttp:any = {
      responseType: 'json' as const,
      observe: 'body' as const
    }
    this.http.get<any[]>(API_URL as string, options_getHttp).subscribe({
      next: (response) => {
        this.status_camera = true;
      },
      error: (error) => {
        this.status_camera = false;
      }
    });
    // this.statusCamera.nativeElement.innerHTML = this.status_camera ? 'Running' : 'Offline';
  }

  checkStatusDB() {
    const API_URL = "http://localhost:9909";
    const options_getHttp:any = {
      responseType: 'json' as const,
      observe: 'body' as const
    }
    this.http.get<any[]>(API_URL as string, options_getHttp).subscribe({
      next: (response) => {
        this.status_db = true;
      },
      error: (error) => {
        this.status_db = false;
      }
    });
    // this.statusDB.nativeElement.innerHTML = this.status_db ? 'Running' : 'Offline';
  }
}


