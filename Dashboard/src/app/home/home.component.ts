import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  title='Home';

  status_camera: boolean;
  status_accelerometer: boolean;
  status_acoustic: boolean;
  status_temperature: boolean;

  constructor() {
    this.status_camera = false;
    this.status_accelerometer = false;
    this.status_acoustic = false;
    this.status_temperature = false;    
  }

  testSensor(sensor: string) {
    console.log("test sensor: "+sensor);
    if(sensor=='camera') {
      this.setStatus('camera', true);
      this.setStatus('accelerometer', false);
      this.setStatus('acoustic', false);
      this.setStatus('temperature', false);
    }
    else if(sensor=='accelerometer') {
      this.setStatus('camera', false);
      this.setStatus('accelerometer', true);
      this.setStatus('acoustic', false);
      this.setStatus('temperature', false);
    }
    else if(sensor=='acoustic') {
      this.setStatus('camera', false);
      this.setStatus('accelerometer', false);
      this.setStatus('acoustic', true);
      this.setStatus('temperature', false);
    }
    else if(sensor=='temperature') {
      this.setStatus('camera', false);
      this.setStatus('accelerometer', false);
      this.setStatus('acoustic', false);
      this.setStatus('temperature', true);
    }
  }

  setStatus(sensor: string, status: boolean) {
    var classAdd = 'status-offline';
    var classRemove = 'status-online';
    var txt = 'Offline';
    if(status == true) {
      classAdd = 'status-online';
      classRemove = 'status-offline';
      txt = 'Running';
    }
  
    let ele = undefined;
    if(sensor=='camera') {
      ele = document.getElementById('status-camera');
      this.status_camera = status;
    }
    else if(sensor=='accelerometer') {
      ele = document.getElementById('status-accelerometer');
      this.status_accelerometer = status;
    }
    else if(sensor=='acoustic') {
      ele = document.getElementById('status-acoustic');
      this.status_acoustic = status;
    }
    else if(sensor=='temperature') {
      ele = document.getElementById('status-temperature');
      this.status_temperature = status;
    }
    
    if(ele != undefined) {
      ele.innerHTML = txt;
      ele.classList.add(classAdd);
      ele.classList.remove(classRemove);
    }
  }
}


