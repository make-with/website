const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');
const routers = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use('/uploads', express.static('uploads'));
app.use('/images', express.static(__dirname + '/../client/build/images'));
app.use(express.static(__dirname + '/../client/build'));

app.use('/', routers);

app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname + '/../client/build/index.html')),
);

app.all('*', (req, res) => res.send('forbidden'));

module.exports = app;
