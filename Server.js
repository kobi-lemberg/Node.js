"use strict";
/*require(__dirname+"/ClientSide/Screens/appdriver.js");
 require(__dirname+"/ClientSide/Screens/message.js");
 require(__dirname+"/ClientSide/Screens/TimeFrame.js");
 require(clientSideScreenPath+"/message.js");
 require(clientSideScreenPath+"/TimeFrame.js");
 */

require('node-import');
var express     = require('express');
var bodyParser  = require('body-parser');
var http        = require('http');
var https = require('https'); //Https module of Node.js
var FormData = require('form-data'); //Pretty multipart form maker.
var path        = require('path');
//var httpLoger = require('morgan');
var fs          = require('fs');
var mongodb     = require('mongodb');
var assert      = require('assert');
var MongoClient = mongodb.MongoClient;
var ObjectId    = mongodb .ObjectID;


var driver = express();
var server = http.createServer(driver);

var io     = require('socket.io').listen(server);
var cors   = require('cors');







//var router = express.Router();

var clientSidePath              = path.resolve('ClientSide');
console.log("clientSidePath:"+clientSidePath);
var clientSideScreenPath        = path.resolve('ClientSide/Screens');
console.log("clientSideScreenPath:"+clientSideScreenPath);
var webSitePath                 = path.resolve('ClientSide/WebSite');
console.log("webSitePath:"+webSitePath);

//router.use(httpLoger());

driver.use( cors({origin: 'http://localhost:8080'})     );
driver.use( express.static(clientSidePath)              );
driver.use( express.static(path.resolve('ClientSide/Screens/ClientCSSAndTemplates/'))              );
driver.use( express.static(path.resolve('ClientSide/Screens/ClientCSSAndTemplates/CSS/'))              );
driver.use( express.static(clientSideScreenPath)        );
driver.use( express.static(webSitePath)                 );
driver.use( bodyParser.json()                           );    // to support JSON-encoded bodies
driver.use( bodyParser.urlencoded( { extended: true } ) );    // to support URL-encoded bodies

var DBName              = 'advertisment';
var msgsCollection        = 'msgs';
var screensCollection   = 'screens';
var url                 = 'mongodb://localhost:27017/'+DBName;
var socketClientsArr    = [];



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
    "timeFrames":[{"startDate":"01/01/2015","endDate":"12/30/2016","daysArr":[0,1,2,3,4,5,6,],"startTime":0,"endTime":23.59}],
    "seconds":5
};




mongodb.connect(url, function(err, db)
{
    if (err)    throw err;
    else        console.log('Successfully connected to the database');




    driver.get('/screen=:screenID', function (req, res) {
        res.sendFile(path.resolve("ClientSide/Screens/ClientPage.html"));
    });


    driver.get('/css=:cssFile', function (req, res) {
        res.sendFile(path.resolve("ClientSide/Screens/ClientsCSSAndTemplates/CSS/"+req.params.cssFile));
    });


    driver.get('/script=:scriptFile', function (req, res) {
        res.sendFile(path.resolve("ClientSide/Screens/"+req.params.scriptFile));
    });


    driver.get('/About', function (req, res) {
        addHeaders(res);
        res.sendFile(path.resolve("ClientSide/Screens/AboutUs.html"));
    });

    //driver.use('/', router);
    driver.get('/', function (req, res) {
        res.sendFile(path.resolve("ClientSide/WebSite/Index.html"));
    });

    driver.get('/Images=:image', function (req, res) {
        addHeaders(res);
        res.sendFile(path.resolve("ClientSide/WebSite/WebSiteContent/WebSiteImages/"+req.params.image));
    });






    driver.get('/TestUpdate', function (req, res) {
        var contentCollection = db.collection(msgsCollection);
        contentCollection.insert(jsonToUpdate,function(err)
        {
            if (err) res.send("Already updated");
            else
            {
                for(var i=0;i<socketClientsArr.length;i++)
                {

                    if(socketClientsArr[i].screenID==(req.query.id))
                    {
                        var contentCollection = db.collection(msgsCollection);
                        var screenIDAsInt = (req.query.id)*1;
                        var clientID = socketClientsArr[i].clientID;
                        contentCollection.find({screenArr: screenIDAsInt}).toArray(function(err, result)
                        {
                            if (err)
                            {
                                res.send("Access Denied");
                                throw err;
                            }
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
    });




    driver.put('/createNewScreen', function (req, res) {

        var contentCollection = db.collection(screensCollection);
        var screenJson = {
                                'screenNumber'  : parseInt(req.body.screenNumber),
                                'houseNumber'        : parseInt(req.body.houseNumber),
                                'zip'           : parseInt(req.body.zip),
                                'screenCity'    : req.body.screenCity,
                                'street'        : req.body.street
                         };

        contentCollection.insert(screenJson,function(err)
        {
            if (err) res.send(err);
            else     res.send('Screen was insert to the databse');

        });


    });



    driver.delete('/deleteScreen=:screenNumber', function (req, res) {

        var contentCollection = db.collection(screensCollection);

        contentCollection.remove( { screenNumber : parseInt(req.params.screenNumber) } ,function(err)
        {
            if (err) res.send('err');
            else     res.send('Screen was deleted');

        });


    });



//update screen details
    driver.post('/screen', function (req, res) {
        var contentCollection = db.collection(screensCollection);
        var screenJson = {
                            'screenNumber'  : parseInt(req.body.screenNumber),
                            'houseNumber'   : parseInt(req.body.houseNumber),
                            'zip'           : parseInt(req.body.zip),
                            'screenCity'    : req.body.screenCity,
                            'street'        : req.body.street
                         };

        contentCollection.update( { screenNumber : parseInt(req.body.screenNumber) } , { $set : screenJson } ,function(err)
        {
            if (err) res.send('err');
            else     res.send('Screen was updated');

        });


    });






    driver.post('/searchMsg', function (req, res) {

        var searchQuery = {};
        var contentCollection = db.collection(msgsCollection);


        req.body.texts            ? searchQuery.texts       = { $elemMatch :  { $eq : req.body.texts       } }     : 1==1;
        req.body.name             ? searchQuery.name        =   req.body.name                                      : 1==1;
        req.body.seconds          ? searchQuery.seconds     =   parseInt(req.body.seconds)                         : 1==1;

        if (Object.keys(searchQuery ).length != 0 )
        {
            contentCollection.find(searchQuery).toArray(function(err,result)
            {
                if (err) res.send(err);
                else     res.send(result);

            });
        }
        else res.send('No attributes to search');

    });



    driver.post('/searchScreen', function (req, res) {

        var searchQuery = {};
        var contentCollection = db.collection(screensCollection);


        req.body.screenCity            ? searchQuery.screenCity       = req.body.screenCity                 : 1==1;
        req.body.street                ? searchQuery.street           = req.body.street                     : 1==1;
        req.body.houseNumber           ? searchQuery.houseNumber      = parseInt(req.body.houseNumber)      : 1==1;

        if (Object.keys(searchQuery ).length != 0 )
        {
            contentCollection.find(searchQuery).toArray(function(err,result)
            {
                if (err) res.send(err);
                else     res.send(result);

            });
        }
        else res.send('No attributes to search');

    });





    driver.get('/screenCountForMsg', function (req, res) {

        console.log("Get screen count for each msg");
        var contentCollection = db.collection(msgsCollection);
        var countArray = [];

        contentCollection.find({}).toArray(function(err, result)
        {
            if (err) throw err;
            else
            {
                result.map(function(msg){
                    countArray.push({'_id': msg.name, 'count':msg.screenArr.length});
                });
            }
            res.send(countArray);
        });

    });





    driver.get('/screensInCity', function (req, res) {
        console.log("Get groupby query - screen by city")
        var contentCollection = db.collection(screensCollection);
        contentCollection.aggregate(
            [
                {
                    $group  : { _id:'$screenCity', 'count' : { $sum : 1 } }
                }

            ]).toArray(function(err,result)
        {
            if (err) res.send(err);
            else     res.send(result);
        });
    });



    driver.get('/screensJSON', function (req, res) {

        var contentCollection = db.collection(screensCollection);
        contentCollection.find({}).toArray(function(err, result)
        {
            if (err) throw err;
            else res.send({JSON : result});
        });
    });

    driver.get('/advertisementJSON', function (req, res) {

        var contentCollection = db.collection(msgsCollection);
        contentCollection.find({}).toArray(function(err, result)
        {
            if (err) throw err;
            else res.send({JSON : result});
        });
    });



    io.sockets.on("connection",function(client){
        console.log("New Connection");
       client.on("getJsonFromServer",function(data){
          console.log("client:  "+client+"\ndata:  "+data+"   client id: "+client.id);
           socketClientsArr.push({
               "clientID":client.id,
               "screenID":data
           });
           var contentCollection = db.collection(msgsCollection);
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
            var contentCollection = db.collection(msgsCollection);
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
        var host = "127.0.0.1";
        var port = server.address().port;
        console.log("App is currently listening at http://%s:%s", host, port);
    });

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