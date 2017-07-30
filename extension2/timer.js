function startTimer(){
	chrome.runtime.sendMessage({"command":"startTimer"},
		function(response){
			console.log(response.message);
		});
}


function addMessageListeners(){
	chrome.runtime.onMessage.addListener(
		function(request,sender,sendResponse){
			if(request.command==="updateTime"){
				var time=request.time;
				document.getElementById("time").innerText=time;
			}
	});
}


/*function abort(){
	document.getElementById("time").innerText=0.0;
}

function startProcess(){
	addMessageListeners();
	startTimer();
}*/


function addOnClick() {
	document.getElementById("stop").onclick = function() {
		chrome.runtime.sendMessage({
			"command": "endTimer"
		});
		document.location = chrome.runtime.getURL("popup.html");
		chrome.browserAction.setBadgeText({"text" : ""});
	}
}


function init(){
	addOnClick();
	addMessageListeners();
	startTimer();
	/*document.getElementById("button1").addEventListener("click",startProcess);
	document.getElementById("button").addEventListener("click",abort);*/
}



document.addEventListener('DOMContentLoaded',init);