"use strict";
/*require(__dirname+"/ClientSide/HTML/appdriver.js");
 require(__dirname+"/ClientSide/HTML/message.js");
 require(__dirname+"/ClientSide/HTML/TimeFrame.js");
 require(clientPath+"/message.js");
 require(clientPath+"/TimeFrame.js");
 */
require('node-import');
var express = require('express');
var http = require('http');
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
var server = http.createServer(driver);
var io = require('socket.io').listen(server);
var cors = require('cors');

// use it before all route definitions
driver.use(cors({origin: 'http://localhost:8080'}));
var clientPath = path.resolve('ClientSide/HTML');
var clientSidePath = path.resolve('ClientSide');
var contentPath = path.resolve('Content');

driver.use(express.static(contentPath));

driver.use(express.static(clientSidePath));
driver.use(express.static(clientPath));

var socketClientsArr=[];

var jsonToUpdate= {
    "screenArr":[4],
    "name":"Coca-Cola update",
    "texts":
        [
            "Still Thirsty updated!!!?",
            "Coca-Cola",
            "Enjoy life, Enjoy Coca-Cola",
            "Visit us at CocaCola.com",
            "Enjoy life, drink Cola. ",
            "did you try the new Coke Zero?"
        ],
    "imgs":["http://pngimg.com/upload/cocacola_PNG16.png","http://pngimg.com/upload/cocacola_PNG16.png","http://pngimg.com/upload/cocacola_PNG16.png","http://pngimg.com/upload/cocacola_PNG16.png"],
    "templateURL":"Coca-Cola",
    "timeFrames":[{"startDate":"01/01/2015","endDate":"12/30/2015","daysArr":[0,1,2,3,4,5,6,7],"startTime":0,"endTime":23.59}],
    "seconds":5
};




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

    driver.get('/css=:cssFile', function (req, res) {
        res.sendFile(path.resolve("ClientSide/HTML/LayoutCSS/"+req.params.cssFile));
    })


    driver.get('/script=:scriptFile', function (req, res) {
        res.sendFile(path.resolve("ClientSide/HTML/"+req.params.scriptFile));
    })


    driver.get('/About', function (req, res) {
        addHeaders(res);
        res.sendFile(path.resolve("ClientSide/HTML/AboutUs.html"));
    })

    driver.get('/Admin', function (req, res) {
        addHeaders(res);
        res.sendFile(path.resolve("ClientSide/HTML/Layout.html"));
    })

    driver.get('/Content/Images=:image', function (req, res) {
        addHeaders(res);
        res.sendFile(path.resolve("Content/Images/"+req.params.image));
    })

    driver.get('/TestUpdate', function (req, res) {
        var contentCollection = db.collection(myCollection);
        contentCollection.insert(jsonToUpdate,function(err)
        {
            if (err) res.send(err);
            else
            {
                for(var i=0;i<socketClientsArr.length;i++)
                {

                    if(socketClientsArr[i].screenID==(req.query.id))
                    {
                        var contentCollection = db.collection(myCollection);
                        var screenIDAsInt = (req.query.id)*1;
                        var clientID = socketClientsArr[i].clientID;
                        contentCollection.find({screenArr: screenIDAsInt}).toArray(function(err, result)
                        {
                            if (err) throw err;
                            else
                            {
                                console.log("clientID as param: "+clientID);
                                io.sockets.connected[clientID].emit("pushUpdatesJsonToClient",JSON.stringify(result));
                            }
                        });
                    }
                }
            }
            console.log("connected clients:    "+JSON.stringify(socketClientsArr));
        });
        console.log(req.params.id);
    })

    io.sockets.on("connection",function(client){
       client.on("getJsonFromServer",function(data){
          console.log("client:  "+client+"\ndata:  "+data+"   client id: "+client.id);
           socketClientsArr.push({
               "clientID":client.id,
               "screenID":data
           });
           var contentCollection = db.collection(myCollection);
           var screenIDAsInt = (data)*1;
           contentCollection.find({screenArr: screenIDAsInt}).toArray(function(err, result)
           {
               if (err) throw err;
               else client.emit("pushJsonToClient",JSON.stringify(result));
           });

       });


        /* Update the client  */
        client.on("pushUpdatesJsonToClient",function(data){
            console.log("client:  "+client+"\ndata:  "+data+"   client id: "+client.id);
            socketClientsArr.push({
                "clientID":client.id,
                "screenID":data
            });
            var contentCollection = db.collection(myCollection);
            var screenIDAsInt = (data)*1;
            contentCollection.find({screenArr: screenIDAsInt}).toArray(function(err, result)
            {
                if (err) throw err;
                else client.emit("pushJsonToClient",JSON.stringify(result));
            });

        });



        client.on('disconnect', function () {
            console.log("Client Array size is: "+socketClientsArr.length);
            console.log("client:  "+client+ "client.id:  "+client.id);
            for(var i=0;i<socketClientsArr.length;i++)
            {
                if(socketClientsArr[i].clientID == client.id)
                {

                    socketClientsArr.splice(i,1);
                    i--;

                    console.log("Client removed!");
                    console.log("Client Array size is: "+socketClientsArr.length);
                }
            }


        });



    });



    server.listen(8080, function ()
    {
        var host = ("127.0.0.1");
        var port = server.address().port;
        console.log("App is currently listening at http://%s:%s", host, port);
    })
});


var addHeaders = function(res)
{
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:8080');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
}