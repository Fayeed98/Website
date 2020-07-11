const express = require('express');
const _ = require('lodash');
const uuid = require('uuid/v4');
const bodyParser = require('body-parser');
const UserRoutes= require('./src/controllers/user-controller');
const BookingRoutes= require('./src/controllers/bookings-controller'); 
var cors = require('cors')
var moment=require('moment')
var app = express();
var day= require('dayjs')
const port = 5000;
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/user', UserRoutes);
app.use('/booking', BookingRoutes);

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
