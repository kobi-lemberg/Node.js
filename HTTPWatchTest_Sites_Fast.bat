rem start cmd /c C:\"Flash Networks"\"Browse Meter"\Watchdog.exe

rem ##############################################################
	rem # Change these values according to the test
	rem ##############################################################

rem #set the current day
set date=Date_19032015_Sites_MSP51_107
rem #set F5 ip
set F5=10.140.128.150

rem ####################################################################
    rem Do not change anything below
	rem ################################################################

set path=C:\QA\KPI\%date%\Sites

rem ############## loops number 

rem ############## FOR /L %%i IN (Start Step End) DO (   #################

FOR /L %%j IN (1 1 500) DO (

rem Slow sites

echo Starting Slow sites Test
FOR /L %%i IN (2 1 5) DO (
    rem ##############################################################
	rem # TCP test 
	rem ##############################################################
	
	cd C:\Flash Networks\Browse Meter
	plink.exe -pw f1@shr00t -m f5-change-remove.ssh root@%F5%
        "C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt TCP%%i+%%j %path%\Slow_OptOut true IE

	 
rem ##############################################################
	rem # CLS test 
	rem ##############################################################
	
	cd  C:\Flash Networks\Browse Meter	
	plink.exe -pw f1@shr00t -m f5-change-add.ssh root@%F5%
	"C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt CLS_TEST%%i+%%j %path%\Slow_OptIn true IE
)
echo Done with the Slow sites Test


rem Medium sites

echo Starting Medium sites Test
FOR /L %%i IN (6 1 11) DO (
    rem ##############################################################
	rem # TCP test 
	rem ##############################################################
	
	cd C:\Flash Networks\Browse Meter
	plink.exe -pw f1@shr00t -m f5-change-remove.ssh root@%F5%
        "C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt TCP%%i+%%j %path%\Medium_OptOut true IE
	
	
rem ##############################################################
	rem # CLS test 
	rem ##############################################################

	cd  C:\Flash Networks\Browse Meter	
	plink.exe -pw f1@shr00t -m f5-change-add.ssh root@%F5%
	"C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt CLS_TEST%%i+%%j %path%\Medium_OptIn true IE
)
echo Done with the medium sites Test


rem Fast sites

echo Starting Fast sites Test
FOR /L %%i IN (12 1 22) DO (
    rem ##############################################################
	rem # TCP test 
	rem ##############################################################

	cd C:\Flash Networks\Browse Meter
	plink.exe -pw f1@shr00t -m f5-change-remove.ssh root@%F5%
        "C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt TCP%%i+%%j %path%\Fast_OptOut true IE
	  
	 
	rem ##############################################################
	rem # CLS test 
	rem ##############################################################

	cd  C:\Flash Networks\Browse Meter	
	plink.exe -pw f1@shr00t -m f5-change-add.ssh root@%F5%
	"C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt CLS_TEST%%i+%%j %path%\Fast_OptIn true IE
)
echo Done with Fast sites Test


rem Offline sites

echo Starting offline sites Test
FOR /L %%i IN (23 1 32) DO (
    rem ##############################################################
	rem # TCP test 
	rem ##############################################################
	 
	cd C:\Flash Networks\Browse Meter
	plink.exe -pw f1@shr00t -m f5-change-remove.ssh root@%F5%
        "C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt TCP%%i+%%j %path%\Offline_OptOut true IE
	
	 
	rem ##############################################################
	rem # CLS test 
	rem ##############################################################

	
	cd  C:\Flash Networks\Browse Meter	
	plink.exe -pw f1@shr00t -m f5-change-add.ssh root@%F5%
	"C:\Flash Networks\Browse Meter\BrowseMeter.exe" C:\Performance\httplist\Sites\%%i.txt CLS_TEST%%i+%%j %path%\Offline_OptIn true IE
)
echo Done with the offlie sites Test 


)