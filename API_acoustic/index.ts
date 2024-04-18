const express = require('express');
const http = require('http');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
const fs = require('fs');
const dotenv = require('dotenv').config();
const cors = require('cors');
app.use(cors());

const rxjs = require('rxjs');

const window_size = 25600; // frequency domain of FFT (128*200)
const window_size_sampling = 128; // discrete points along frequency domain

interface IData {
    a: number; // amplitude
}
let data: IData[]; // amplitude

interface IFreq {
    f: number; // frequency
}
let freq: IFreq[] = []; // frequency
for(let f=window_size_sampling; f<=window_size; f+=window_size_sampling) {
    freq.push({f:f});
}

function getData() {
    // data = [];
    // for (let i = 0; i < freq.length; i++) {
    //     let y = Math.random() * 10000;
    //     data.push({a:y});
    // }
    fakeFFTData();
}

// GET endpoint
app.get('/', (req:any, res:any) => {
    getData();
    // console.log(data.length);

    res.status(200);
    res.json(data);
    return res;
});
app.get('/freq', (req:any, res:any) => {
    res.status(200);
    res.json(freq);
    return res;
});

app.listen(process.env.PORT, () => {
    console.log(`Acoustic data API hosted on port ${process.env.PORT}`)
});


function fakeFFTData() {
    let peak1 = Math.round(Math.random() * 10 + 45);
    let peak2 = Math.round(Math.random() * 5 + 100);
    let peak3 = Math.round(Math.random() * 5 + 111);

    data = [];
    for (let i = 0; i < freq.length; i++) {
        let y = Math.random() * 10;

        if(i < freq.length*0.25) {
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
        if(i>70 && i<80) {
            y += Math.random() * 5;
        }
        if(i>80 && i<130) {
            y += Math.random() * 30 + 5;
        }
        if(i>130 && i<140) {
            y += Math.random() * 15;
        }
        if(i == 25) {
            y += 30;
        }
        if(i == 28) {
            y += 50;
        }
        if(i == 128) {
            y += 50;
        }
        if(i == 178) {
            y += 50;
        }
        

        data.push({a:y});
    }
}