import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InfoComponent } from './info/info.component';
import { AccelerometerComponent } from './accelerometer/accelerometer.component';
import { AcousticComponent } from './acoustic/acoustic.component';
import { CameraComponent } from './camera/camera.component';
import { TemperatureComponent } from './temperature/temperature.component';
import { UserlogComponent } from './userlog/userlog.component';

export const routes: Routes = [
    { path: '', component: HomeComponent }, 
    { path: 'info', component: InfoComponent }, 
    { path: 'accelerometer', component: AccelerometerComponent }, 
    { path: 'acoustic', component: AcousticComponent }, 
    { path: 'camera', component: CameraComponent }, 
    { path: 'temperature', component: TemperatureComponent },
    { path: 'userlog', component: UserlogComponent }, 
];
