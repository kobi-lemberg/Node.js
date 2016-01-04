"use strict";
/*****************************Helpers***********************************/
/**
 * This Method returns weather a specific msg is available for screen at current timestamp
 * @param startDate represent the startDate at the following format: "MM/DD/YY"
 * @param endDate   represent the endDate at the following format: "MM/DD/YY"
 * @param startTime represent the start hour for display, format is integer: 00:00 -> 0
 * @param endTime represent the start hour for display, format is integer: 24:00 -> 24
 * @param daysArr represent an array of available dayes to display.
 * @returns true if current time is available fot the message.
 */
var isAvailableForDate = function(startDate,endDate,startTime,endTime,daysArr) {
    var now = new Date();
    var time= now.getMinutes();
    time = time * 0.01;
    time = time + now.getHours();
    var flag= false;
    if (Date.parse(now)>= Date.parse(startDate) && Date.parse(now) <= Date.parse(endDate)) {
        if (time>=startTime && time<=endTime) {
            var nowDay = now.getDay();
            for (var i=0; i<daysArr.length;i++) {
                if (daysArr[i] == nowDay) {
                    flag = true;
                }
            }
        }
    }
    return flag;
}
/**
 * This method returns true if specific msg is available for spoecific screenID
 * @param screensArr represent the array of the available screens for the msgs
 * @param screenID represent the screenID
 * @returns {boolean} true if screenID is in screensArr
 */
var isAvailableForScreen = function(screensArr,screenID) {
    for (var i = 0; i < screensArr.length; i++) {
        if(screensArr[i]==screenID)
            return true;
    }
    return false;
}

/**
 * This method parse the JSON of the msgs located under: /ServerSide/DB/msgs/msgs.json and return available msgs as array
 * @param screenID represent the screenID for filtering
 * @returns {Array} finalMsgsToDisplay represent the array of the msgs to send to screenID
 */
var getMsgsFromJSON = function(screenID)
{
    var msgs = JSON.parse(fs.readFileSync("ServerSide/DB/msgs/msgs.json"));
    var finalMsgsToDisplay = [];
    for (var i = 0; i < msgs.length; i++) {
        var screenArr = msgs[i].screenArr;
        if(isAvailableForScreen(msgs[i].screenArr,screenID)) {
            var times = msgs[i]["timeFrames"];
            var timfs = [];
            for (var j = 0; j < times.length; j++) {
                var startDate = times[j].startDate;
                var endDate = times[j].endDate;
                var daysArr = times[j].daysArr;
                var startTime = times[j].startTime;
                var endTime = times[j].endTime;
                if(isAvailableForDate(startDate,endDate,startTime,endTime,daysArr)) {
                    finalMsgsToDisplay[finalMsgsToDisplay.length]=msgs[i];
                }
            }
        }

    }
    return finalMsgsToDisplay;
};



//var screen = 3;
var myCollection  = 'msgs';





/*****************************End Helpers***********************************/

var express = require('express');
var path = require('path');
var fs = require('fs');
require('node-import');
/*require(__dirname+"/ClientSide/Screens/appdriver.js");
require(__dirname+"/ClientSide/Screens/message.js");
require(__dirname+"/ClientSide/Screens/TimeFrame.js");
require(clientPath+"/message.js");
require(clientPath+"/TimeFrame.js");
*/
var mongodb = require('mongodb');
var assert = require('assert');
var MongoClient = mongodb.MongoClient;
var ObjectId = require('mongodb').ObjectID;
var url = 'mongodb://localhost:27017/advertisment';


var driver = express();
var clientPath = path.resolve('ClientSide/Screens');
var clientSidePath = path.resolve('ClientSide');
driver.use(express.static(clientSidePath));
driver.use(express.static(clientPath));






driver.get('/screen=:screenID', function (req, res) {

    //var msgsToSend = getMsgsFromJSON(req.params.screenID);
    //res.render( path.resolve("ClientSide/Screens/ClientPage.jade") , { "msgs": (JSON.stringify(msgsToSend)) , "screenID": (JSON.stringify(req.params.screenID))});
    res.sendFile(path.resolve("ClientSide/Screens/ClientPage.html"));
})

driver.get('/jsonscreen=:screenID', function (req, res) {


    //var msgsToSend = getMsgsFromJSON(req.params.screenID);

    connect(req.params.screenID.toString());

   // res.send(msgsToSend);
    //res.render( path.resolve("ClientSide/Screens/ClientPage.jade") , { "msgs": (JSON.stringify(msgsToSend)) , "screenID": (JSON.stringify(req.params.screenID))});
})

var server = driver.listen(8081, function () {
    var host = server.address().ipaddr;
    var port = server.address().port;
    console.log("App is currently listening at http://%s:%s", host, port);
})

var connect = function(screenID)
{

    var now = new Date();
    var time= (now.getMinutes() *0.01 )+now.getHours();
    var parsedNow = Date.parse(now).toString();



    var findAdvertisments = function(screenID,db,resault, callback)
    {
        var cursor =db.collection(myCollection).find({screenArr: screenID.toString(), $or:[{'timeFrames.startDate': {$lt:parsedNow}},{'timeFrames.startDate': parsedNow}], $or:[{ "timeFrames.endDate": { $gt: parsedNow }}, {"timeFrames.endDate": parsedNow }]});
        cursor.each(function(err, doc)
        {
            assert.equal(err, null);
            if (doc != null)
            {

                console.dir(doc);
                console.log(doc);
                resault=doc;
                return resault;

            } else
            {
                callback();
            }
        });
    };




    MongoClient.connect(screenID,url, function(err, db)
    {
        assert.equal(null, err);
        findAdvertisments(screenID,db,resault, function()
        {
            db.close();
            console.log("Closed!");
            return resault;
        });
    });

}


/*var findRestaurants = function(db, callback) {
    var cursor =db.collection('msgs').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.dir(doc);
            console.log(doc);
        } else {
            callback();
        }
    });
};*/



//
//MongoClient.connect(url, function(err, db) {
//    assert.equal(null, err);
//    findRestaurants(db, function() {
//        db.close();
//        console.log("Closed!");
//    });
//});




//console.log("1/1/2015:" +Date.parse("1/1/2015"));
//console.log("12/30/2015:" +Date.parse("12/30/2015"));
