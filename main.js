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
  // https://developer.chrome.com/extensions/tabs#method-query
  var queryInfo = {
    active: true,
    currentWindow: true
  };

  chrome.tabs.query(queryInfo, function(tabs) {
    // chrome.tabs.query invokes the callback with a list of tabs that match the
    // query. When the popup is opened, there is certainly a window and at least
    // one tab, so we can safely assume that |tabs| is a non-empty array.
    // A window can only have one active tab at a time, so the array consists of
    // exactly one tab.
    var tab = tabs[0];
    console.log(tab);

    // A tab is a plain object that provides information about the tab.
    // See https://developer.chrome.com/extensions/tabs#type-Tab
    var url = tab.url;
    alert("123");
    tab[0].url = "test";

    // tab.url is only available if the "activeTab" permission is declared.
    // If you want to see the URL of other tabs (e.g. after removing active:true
    // from |queryInfo|), then the "tabs" permission is required to see their
    // "url" properties.
    console.assert(typeof url == 'string', 'tab.url should be a string');
  });

  // Most methods of the Chrome extension APIs are asynchronous. This means that
  // you CANNOT do something like this:
  //
  // var url;
  // chrome.tabs.query(queryInfo, function(tabs) {
  //   url = tabs[0].url;
  // });
  // alert(url); // Shows "undefined", because chrome.tabs.query is async.
}


function renderStatus(statusText) {
	document.getElementById('status').innerHTML = statusText;
  getCurrentTabUrl();
}

document.addEventListener('DOMContentLoaded', renderStatus("404"));