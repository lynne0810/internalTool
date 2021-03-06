/**
* Define classes and globle variables
*/
function Parameter(shortName, realName, key){
	this.shortName = shortName;
	this.realName = realName;
	this.key = key;
}
/*
var namePairs = {
	"host" : "host",
	"path" : "pathname",
	"dev" : ".origin",
	"vkey" : "__gsm_lpm_params=vkey",
	"gsm" : "__gsm_lpm_host"
}
*/
var json = {
	'protocal' : "http:",
	'dev1' : 'disgustmust.corp.gq1.yahoo.com',
	'dev2' : 'nameblame.corp.gq1.yahoo.com',
	'host1' : 'us.dev-current.web.search.yahoo.com',
	'host2' : 'us.dd.web.search.yahoo.com',
	'path1' : "search",
	'path2' : "search/ads",
	'gsmhost1' : "us.devqa.gsmwsc.search.yahoo.com",
	'gsmhost2' : "us.data.gsmwsc.search.yahoo.com"
};

var paraName = ["host", "path", "dev", "vkey", "gsmhost"];
var realParaName = ["host", "pathname", ".origin", "__gsm_lpm_params=vkey", "__gsm_lpm_host"];
/*------------------End of defination----------------------------*/

/**
 * parse the string to an object
 * the format for the string should be dev1host1dev2
 * the object should be the object for location
 */
function parseString(location, callback){
	location = location.replace(" ", "");
	location = location.toLowerCase();
	var nameObj = new Array();
	//every para should end up with a number, the format is [a-z]*[1-9]
	var locationArray = new Array();
	var start = 0;
	var end = 0;
	for (var i = 0; i < location.length; i++){
		if(location[i] <= "9" && location[i] >= "0"){
			var temp = location.substr(start, end - start + 1);
			nameObj[temp] = json[temp + location[i]];
			start = end + 2;
		}else{
			end = i;
		}
	}

	callback(nameObj);
}

/**
 * the format of the return value for this function
 * 
 */
function getSearchObjects(){
	var searchContext = window.location.search.substring(1, window.location.search.length);
	var paraString = searchContext.split("&");
	var paraArray = [];
	for(var i = 0; i < paraString.length; i++){
		var temp = paraString[i].split("=",2);
		paraArray[temp[0]] = temp[1];
	}
	return paraArray;
}

function getFinalSearchString(paraArray){
	var finalString = "?";
	for(var key in paraArray){
		finalString += (key + "=" + paraArray[key] + "&");
	}
	finalString = finalString.substring(0, finalString.length - 1);
	console.log(finalString);
	window.location.search = finalString;
}

function changeURL(dataObj){
	var paraArray = getSearchObjects();
	for(var i = 0; i < paraName.length; i++){
		if(dataObj[paraName[i]] === undefined) 
			continue;
		if((paraName[i] === "host" || paraName[i] === "path")){
			var locationVar = realParaName[i];
			console.log(dataObj[paraName[i]]);
			window.location[locationVar] = dataObj[paraName[i]];
		}else{
			//if it is in the current url
			paraArray[realParaName[i]] = dataObj[paraName[i]];
		}
	}
	getFinalSearchString(paraArray);
}

function modifyURL(text){
	parseString(text, changeURL);
	console.log(window.location);
}

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    console.log(request, sender, sendResponse);
    if (request.greeting == "modifyURL"){
    	modifyURL(request.content);
    	sendResponse({farewell: "good"});
    }
});