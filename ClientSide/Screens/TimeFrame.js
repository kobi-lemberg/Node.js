/**
 * Created by Kobi on 14/11/2015.
 */

var TimeFrame =  function(startdate,enddate,daysArr,starttime,endtime)
{
    this.startDate=Date.parse(startdate);
    this.endDate=Date.parse(enddate);
    this.daysArr=daysArr;
    this.startTime=starttime;
    this.endTime=endtime;
};

TimeFrame.prototype.display = function() {
    console.log("im here in display");
    var now = new Date();
    console.log(now);
    var time= now.getMinutes();
    time = time * 0.01;
    time = time + now.getHours();
    console.log("Time:"+time);
    var flag= false;
    console.log("date.parse(now)="+Date.parse(now));
    console.log("Dates:"+this.startDate+" "+this.endDate);
    if (Date.parse(now)>= this.startDate && Date.parse(now) <= this.endDate)
    {
        console.log("The date is good!");
        if (time>=this.startTime && time<=this.endTime)
        {
            console.log("the time is good");
            var nowDay = now.getDay();
            for (var i=0; i<this.daysArr.length;i++) {
                if (this.daysArr[i] == nowDay) {
                    flag = true;
                }
            }
        }
    }
    return flag;
};


