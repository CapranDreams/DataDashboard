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
// import { Observable, timer  } from 'rxjs';

interface ITempData {
    x: number; // time
    y: number; // temp
}
let data: ITempData[] = [{
    x: 0,
    y: 0
}];

let temp_tracking = 25;
let temp_dir = -2
const ini_date = Date.now();

function getTempData() {
    let x = (Date.now() - ini_date)/1000.0;
    let y = temp_tracking;
    if(temp_tracking > 150) { temp_dir = -6; }
    else if(temp_tracking < 70) { temp_dir = -4; }
    let dy = (Math.round(Math.random() * 10) + temp_dir);
    y += dy;
    temp_tracking = y;
    data = [{x, y}];
}

// GET endpoint
app.get('/', (req:any, res:any) => {
    getTempData();

    res.status(200);
    res.json(data);
    return res;
});

app.listen(process.env.PORT, () => {
    console.log(`Temperature data API hosted on port ${process.env.PORT}`)
});
