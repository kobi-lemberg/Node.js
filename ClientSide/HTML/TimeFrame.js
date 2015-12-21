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
}

TimeFrame.prototype.display = function() {
    var now = new Date();
    var time= now.getMinutes();
    time = time * 0.01;
    time = time + now.getHours();
    var flag= false;
    if (Date.parse(now)>= this.startDate && Date.parse(now) <= this.endDate)
    {
        if (time>=this.startTime && time<=this.endTime)
        {
            var nowDay = now.getDay();
            for (var i=0; i<this.daysArr.length;i++) {
                if (this.daysArr[i] == nowDay) {
                    flag = true;
                }
            }
        }
    }
    return flag;
}


