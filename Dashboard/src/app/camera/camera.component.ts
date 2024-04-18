import { Component, ElementRef, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, Router } from '@angular/router';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FFmpeg } from '@ffmpeg/ffmpeg';


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
export class CameraComponent {
  constructor(
    private router : Router, 
    private elementRef: ElementRef, 
    private http : HttpClient, 
    private ffmpeg: FFmpeg,
  ) {
    console.log("CameraComponent initialized");
  }



}
