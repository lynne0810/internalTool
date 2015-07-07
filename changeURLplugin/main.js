document.getElementById("inputPad").onkeypress = handleKeyPress;

function handleKeyPress(e){
	if(e.keyCode === 13){
		//alert("Enter is pressed");
		var text = document.getElementById("inputPad").value;
		chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  			chrome.tabs.sendMessage(tabs[0].id, {greeting: "modifyURL", content: text}, function(response) {
    			console.log(response.farewell);
 			});
		});
	}
}
