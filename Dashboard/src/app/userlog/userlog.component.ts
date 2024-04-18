import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FormsModule } from '@angular/forms';

const API_URL = "http://localhost:9909";
const API_URL_NEWRECORD = "http://localhost:9909/new";

interface Log {
  user: string;
  time: string;
}

@Component({
  selector: 'app-userlog',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule
  ],
  templateUrl: './userlog.component.html',
  styleUrl: './userlog.component.css'
})
export class UserlogComponent {
  logs: Log[] = [];  
  userval: string = '';

  

  constructor(private http: HttpClient) {
    console.log('userlog component');
    this.updateData();
  }

  

  public addRecord() {
    let filteredName = this.userval.replace(/[^0-9a-z]/gi, '')
    const newRecord = {name: filteredName};
    console.log("new record: " + newRecord);

    this.http.post(API_URL_NEWRECORD, newRecord, {
      headers: new HttpHeaders({
        "Access-Control-Allow-Headers":
        "Content-Type, Authorization, Content-Length, X-Requested-With",
        "Access-Control-Allow-Origin": "*",
        'Content-Type': 'application/json'
      })
    }).subscribe({
    // this.http.post<Log>(API_URL_NEWRECORD, newRecord).subscribe({
      next: (response) => {
        // this.addData(response);
        this.updateData();
      },
      error: (error) => {
        console.log('Error:', error);
      }

    });

    this.userval = '';
  }



  private options_getHttp:any = {
    responseType: 'json' as const,
    observe: 'body' as const
  }
  getConfig() {
    return this.http.get<Log[]>(API_URL as string, this.options_getHttp);
  }
  updateData = () => {
    this.getConfig().subscribe({
      next: (response) => {
        this.addData(response);
        console.log(response);
      },
      error: (error) => {
        console.log('Error:', error);
      }
    });
  }
 
  addData = (data:any) => {
    this.logs = [];
    data.forEach( (val:any) => {
      console.log(val);
      this.logs.push({user: val.name, time: val.time});
    });
  }



}
