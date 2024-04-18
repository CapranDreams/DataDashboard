const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http/*, {origins: allowedOrigins} */);
const cors = require('cors');
const port = 9904;

app.use(cors());
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.set('views', __dirname + "/public");
var devices;

