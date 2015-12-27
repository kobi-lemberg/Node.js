

rem ##############################################################
	rem # Set this value in order to run
	rem ##############################################################

set date=Date_1112
rem #set mongoPath 
rem #set pf
set pf=Program Files
set mongoPath=C:\%pf%\MongoDB\Server\3.2\bin
rem #set dbDir 
set dbDir=C:\db\mongodb\data
rem #set currentLocation
set currentLocation=%cd%


start cmd /k "%mongoPath%\mongod.exe" --dbpath %dbDir%
ping -n 8 127.0.0.1 >nul

