"use strict";
/*require(__dirname+"/ClientSide/HTML/appdriver.js");
 require(__dirname+"/ClientSide/HTML/message.js");
 require(__dirname+"/ClientSide/HTML/TimeFrame.js");
 require(clientPath+"/message.js");
 require(clientPath+"/TimeFrame.js");
 */
require('node-import');
var express = require('express');
var path = require('path');
var fs = require('fs');
var myCollection  = 'msgs';
var DBName ='advertisment';
var mongodb = require('mongodb');
var assert = require('assert');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/'+DBName;
var driver = express();
var cors = require('cors');

// use it before all route definitions
driver.use(cors({origin: 'http://localhost:8081'}));
var clientPath = path.resolve('ClientSide/HTML');
var clientSidePath = path.resolve('ClientSide');
driver.use(express.static(clientSidePath));
driver.use(express.static(clientPath));


mongodb.connect(url, function(err, db)
{
    if (err) {
        throw err;
    }
    else {
        console.log('Successfully connected to the database');
    }








    driver.get('/screen=:screenID', function (req, res) {



        res.sendFile(path.resolve("ClientSide/HTML/ClientPage.html"));
    })
    driver.get('/jsonscreen=:screenID', function (req, res) {



        var contentCollection = db.collection(myCollection);
        var screenIDAsInt = (req.params.screenID)*1;
        var now = new Date();
        var time = (now.getMinutes() * 0.01)+ now.getHours(); //current time in the following format: HH.MM
        var parsedNow = Date.parse(now).toString(); //Current date as int, represent the the number of milliseconds since January 1, 1970, 00:00:00 UTC or NaN if the string is unrecognised or contains illegal date values (e.g. 2015-02-31).
        contentCollection.find(
            //screenID in screenArr && startDate <= parsedNow && parsedNow <= endDate && startTime <= time && time <= endTime
            //{screenArr: screenIDAsInt,'timeFrames.startDate':{$lte:parsedNow},"timeFrames.endDate":{$gte:parsedNow},'timeFrames.startTime':{$lte:time},"timeFrames.endTime":{$gte:time}}
            {screenArr: screenIDAsInt}
        ).toArray(function(err, result)
        {
            if (err) {
                throw err;
            } else {
                res.send(JSON.stringify(result));
            }
        });
    })
    var server = driver.listen(8081, function ()
    {
        var host = ("127.0.0.1");
        var port = server.address().port;
        console.log("App is currently listening at http://%s:%s", host, port);
    })
});


var addHeaders = function(res)
{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8081');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
}