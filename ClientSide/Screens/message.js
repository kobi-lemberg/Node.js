/**
 * Created by Kobi on 10/11/2015.
 */

"use strict";
var Message = function(screensArr,name,textsArr,imgsArr,templatesURL,timeFramesArr,seconds)
{
    if(textsArr.length<=10&&imgsArr.length<=5)
    {
        this.screenArr = screensArr;
        this.name=name;
        this.texts = textsArr;
        this.imgs=imgsArr;
        this.templateURL = templatesURL;
        this.timeFrames = timeFramesArr;
        this.seconds=seconds;
    }
    else
    {
        console.log("The length of the text fields or Images fields are incompatible");
    }
}

Message.prototype.getTemplateURL = function() {
    return this.templateURL;
}

Message.prototype.getScreensArr = function() {
    return this.screenArr;
}

Message.prototype.isAvailableForScreen = function (screenID){
    for (var i=0; i<(this.getScreensArr()).length;i++) {
        if (screenID==(this.getScreensArr())[i])
        {
            return true;
        }
    }
    return false;
}