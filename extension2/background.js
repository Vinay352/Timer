var states={
	"off":"garbage text",
	"pomodoro":"garbage text"
};
var currentState="off";


function updateTime(diff){
	chrome.runtime.sendMessage({
		"command":"updateTime",
		"time":diff
	});
}


function notifyUser(){
	var opts={
		"type":"basic",
		"title":"Break Time!",
		"message":"10 seconds break",
		"iconUrl":"icon.png"
	};
	var idBase="pomodoro";
	var id=idBase+(new Date()).getTime();
	chrome.notifications.create(id,opts,function(){
		console.log(idBase+" created");
	});
}



function startTimer(){
	var start=moment();
	var timer=setInterval(function(){
		var diff=moment().diff(start,'seconds');
		updateTime(diff);
		if(diff>=60){
			clearInterval(timer);
			notifyUser();
			setTimeout(startTimer,10000);
		}
	},1000);
	currentState="pomodoro";
}

 
chrome.runtime.onMessage.addListener(
	function(request,sender,sendResponse){
		if(request.command==="startTimer" && currentState==="off"){
			startTimer();
			sendResponse({message:"Timer started."});
		}
});



