rem ##############################################################
	rem # Set this value in order to run
	rem ##############################################################

set date=Date_19032015_Sites_MSP51_107
rem #set mongoPath 
set mongoPath=C:\Program Files\MongoDB\Server\3.2\bin
rem #set dbDir 
set dbDir=C:\db\mongodb\data
rem #set currentLocation
set currentLocation=%cd%


"%cd%\mongo1.bat"

"%mongoPath%\mongoimport.exe" --db advertisment --collection msgs --file %cd%\Advertisment.json --jsonArray

node Server.js

pause