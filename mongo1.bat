

rem ##############################################################
	rem # Set this value in order to run
	rem ##############################################################

set date=Date_19032015_Sites_MSP51_107
rem #set mongoPath 
rem #set pf
set pf=Program Files
set mongoPath=C:\%pf%\MongoDB\Server\3.2\bin
rem #set dbDir 
set dbDir=C:\db\mongodb\data
rem #set currentLocation
set currentLocation=%cd%




"%mongoPath%\mongoimport -d advertisment -c msgs %cd%\Advertisment.JSON --jsonArray"

"%mongoPath%\mongod.exe" --dbpath %dbDir%
pause