import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-camera',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet
  ],
  templateUrl: './camera.component.html',
  styleUrl: './camera.component.css'
})
export class CameraComponent implements AfterViewInit, OnDestroy {
  constructor(
    private router : Router, 
    // private elementRef: ElementRef, 
    // private http : HttpClient
  ) {
    console.log("CameraComponent initialized");
  }

  @ViewChild('videoPlayer') videoplayer!: ElementRef;
  videosources: string[] = ["http://onyxibex.com/sensor/assets/video/surface_temp_estimate_24022300.webm",
                            "http://onyxibex.com/sensor/assets/video/surface_temp_estimate_24022706.webm",
                            "http://onyxibex.com/sensor/assets/video/surface_temp_estimate_24022805.webm",
                            "http://onyxibex.com/sensor/assets/video/surface_temp_estimate_24032705.webm",
                          ];
  
  videosource: string = this.getRandomVideo();
  playPromise!: Promise<any>;

  getRandomVideo() {
    let res = this.videosources[Math.floor(Math.random() * this.videosources.length)];
    console.log(res);
    return res;
  }
  getNextVideo() {
    return this.videosources[(this.videosources.indexOf(this.videosource) + 1) % this.videosources.length];
  }
  
  ngAfterViewInit() {
    this.videoplayer.nativeElement.src = this.videosource;
    this.videoplayer.nativeElement.load();
    this.playPromise = this.videoplayer.nativeElement.play();
    this.videoplayer.nativeElement.playbackRate = 5.0;

    this.videoplayer.nativeElement.addEventListener('ended', () => {
      console.log("next video");  
      this.videosource = this.getNextVideo();
      this.videoplayer.nativeElement.src = this.videosource;
      this.videoplayer.nativeElement.load();
      this.playPromise = this.videoplayer.nativeElement.play();
      this.videoplayer.nativeElement.playbackRate = 5.0;
    });
  }

  ngOnDestroy(): void {
    if (this.videoplayer.nativeElement.playing) {
      this.videoplayer.nativeElement.pause();
    }
  }

}

