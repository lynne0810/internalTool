var json = {
	'protocal' : "http:",
	'dev1' : 'disgustmust.corp.gq1.yahoo.com',
	'dev2' : 'nameblame.corp.gq1.yahoo.com',
	'host1' : 'us.dev-current.web.search.yahoo.com',
	'host2' : 'us.dd.web.search.yahoo.com',
	'path1' : "search",
	'path2' : "search/ads"  
};

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

	callback(window, nameObj);
}

function changeURL(myWindow, dataObj){
	console.log(dataObj);
	if(dataObj["host"] !== undefined){
		myWindow.location.host = dataObj["host"];
	}
	if(dataObj["path"] !== undefined){
		myWindow.location.pathname = dataObj["path"];
	}
}

function modifyURL(text){
	parseString(text, changeURL);
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