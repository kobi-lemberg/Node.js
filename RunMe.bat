
cd C:\Program Files\MongoDB\Server\3.2\bin
"C:\Program Files\MongoDB\Server\3.2\bin\mongod.exe" --dbpath c:\db\mongodb\data

////C:\Program Files\MongoDB\Server\3.2\bin\mongo.exe (mongo)

"C:\Program Files\MongoDB\Server\3.2\bin\mongoimport.exe" --db test--collection msgs --file Advertisment.json --jsonArray
use advertisment

node Server.js
