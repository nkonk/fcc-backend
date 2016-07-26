var express = require("express");

var app = express();
var monthMap = {
  0: "January",
  1: "February",
  2: "March",
  3: "April",
  4: "May",
  5: "June",
  6: "July",
  7: "August",
  8: "September",
  9: "October",
  10: "November",
  11: "December"
}
var monthRevMap = {
   "January" : 0,
  "February" : 1,
   "March" : 2,
   "April" : 3,
   "May" : 4,
   "June" : 5,
   "July" : 6,
   "August" : 7,
   "September" : 8,
   "October" : 9,
   "November" : 10,
   "December" : 11
}
app.get("/:inpTs",function(req,resp){
  var inpStr = req.params.inpTs.toString();
  var tsObj = {
    "unix": null,
    "natural": null
    }
    //see if its a TS
    var tsNum = Number(inpStr);
      if (isNaN(tsNum)){
      // if its NaN could be natural lang
      try{
      var natArr = inpStr.split(",");
      var yrNo = Number(natArr[1].trim());
      var monNo = Number(monthRevMap[natArr[0].split(" ")[0].trim()]) || null ;
      var dateNo = Number(natArr[0].split(" ")[1])|| null;
      if(!yrNo ||!monNo || !dateNo ){resp.send(tsObj); return;}
      
      var date = new Date(yrNo,monNo,dateNo);
      tsObj.unix = date.getTime()/1000;
      tsObj.natural = inpStr;
      resp.send(tsObj);
      }
      catch(e) {
        tsObj.unix = null;
        tsObj.natural = null;
        resp.send(tsObj);
      }
      }
      else{
        var dat = new Date(tsNum)
        if(dat.toString().indexOf("Invalid Date") > -1){
          //send back null values
          resp.send(tsObj)
        }
        else{
         tsObj.natural = "" + monthMap[dat.getMonth()] + " " + dat.getDate() + ", " +dat.getFullYear();
         tsObj.unix = tsNum;
         resp.send(tsObj);
        }
      }
});

app.listen(8080,function(){
  console.log("App running on port 8080");
});