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
	if(dataObj["host"] !== undefined){
		myWindow.location.host = dataObj["host"];
	}
}

function getCurrentTabUrl() {
  // Query filter to be passed to chrome.tabs.query - see
  var queryInfo = {
    active: true,
    currentWindow: true
  };
}

function renderStatus(statusText) {
	document.getElementById('status').innerHTML = statusText;
  getCurrentTabUrl();
}

document.addEventListener('DOMContentLoaded', renderStatus("404"));

chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {
    console.log(response);
  });
});
