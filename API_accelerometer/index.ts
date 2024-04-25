const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
// const jsonParser = bodyParser.json();
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');
const dotenv = require('dotenv').config();
const cors = require('cors');
app.use(cors());
const rxjs = require('rxjs');

let frequency_bins = 128;
let time_bins = 256;

interface IData {
    time: number; // time
    fft: number[]; // temp
}
let data: IData[] = [];

function getData() {
    data = [];
    for (let t = 0; t < time_bins; t++) {
        let fft = fakeFFTData(t);
        data.push({time:t, fft:fft});
    }
}

// GET endpoint
app.get('/', (req:any, res:any) => {
    getData();

    res.status(200);
    res.json(data);
    return res;
});

app.listen(process.env.PORT, () => {
    console.log(`Accelerometer data API hosted on port ${process.env.PORT}`)
});

function fakeFFTData(t:number) {
    let peak1 = Math.round(Math.random() * 10 + frequency_bins*0.2);
    let peak2 = Math.round(Math.random() * 5 + frequency_bins*0.78);
    let peak3 = Math.round(Math.random() * 5 + frequency_bins*0.65);

    let res: number[] = [];
    for (let i = 0; i < frequency_bins; i++) {
        let y = Math.random() * 10;

        if(i < frequency_bins*0.25) {
            y += Math.random() * 20;
        }
        if(i<peak1 && i>peak1-10) {
            y += Math.random() * 40 + 10;
        }
        if(i == peak1) {
            y += 120;
        }
        if(i == peak2) {
            y += 80;
        }
        if(i == peak3) {
            y += 90;
        }
        if(i>frequency_bins*0.35 && i<frequency_bins*0.4) {
            y += Math.random() * 5;
        }
        if(i>frequency_bins*0.54 && i<frequency_bins*0.62) {
            y += Math.random() * 30 + 5;
        }
        if(i>frequency_bins*0.5 && i<frequency_bins*0.64) {
            y += Math.random() * 15;
        }
        if(i == frequency_bins*0.1) {
            y += 30;
        }
        if(i == frequency_bins*0.14) {
            y += 50;
        }
        if(i == frequency_bins*0.7) {
            y += 50;
        }
        if(i == frequency_bins*0.9) {
            y += 50;
        }
        
        if(y<0) {
            y = 0;
        }
        if(y>100) {
            y = 100;
        }
        y = Math.round(y);

        if(Math.random()*100 > 99) {
            if (i>frequency_bins*0.3 && i<frequency_bins*0.4) {
                y += Math.round(Math.random() * 60)+20;
            }
        }

        
        if(Math.random()*100 > 90) {
            let randfreq = Math.random()/50 + 0.5
            if(i>=frequency_bins*randfreq && i<frequency_bins*(randfreq+0.02))
                y = Math.round(Math.random() * 60)+10;
        }
        
        // if(Math.random()*100 > 4) {

        //     let now = new Date().getTime()%1000;
        //     // console.log(now);
        //     if(now > 800) {
        //         let randfreq = Math.random()/50 + 0.425
        //         if(i>=frequency_bins*randfreq && i<frequency_bins*(randfreq+0.015))
        //             if((t)%10 > 3)
        //                 y = Math.round(Math.random() * 40)+5;
        //     }
        //     else {
        //         let randfreq = Math.random()/200 + 0.40
        //         if(i>=frequency_bins*randfreq && i<frequency_bins*(randfreq+0.015))
        //             y = Math.round(Math.random() * 30);
        //     }
        // }

        
        if(Math.random()*100 > 10) {
            let randfreq = Math.random()/300 + 0.53
            if(i>=frequency_bins*randfreq && i<frequency_bins*(randfreq+0.01))
                {
                    let randoffset = Math.random()*3;
                    if((t+randoffset)%20 > 13)
                        y = Math.round(Math.random() * 80)+40;
                }
        }
        

        res.push(y);
    }

    return res;
}