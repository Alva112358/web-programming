var EventUtil = {
	addHandler: function(element,type,handler) {
		if(element.addEventListener) {
			element.addEventListener(type,handler,false);
		}
		else if(element.attachEvent) {
			element.attachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = handler;
		}
	},

	removeHandler: function(element,type,handler) {
		if(element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		}
		else if(element.detachEvent) {
			element.detachEvent("on" + type, handler);
		}
		else {
			element["on" + type] = null;
		}		
	}
}

var isStart = false;
var Button = document.getElementById("count");
var State = document.getElementById("myState");
var Mouse = document.getElementsByClassName("mouse");
var showTime = document.getElementById("BorderOne");
var showPoint = document.getElementById("BorderTwo");
var InterOne = null;
var TimeOne = null;
var Time = showTime.value;
var Point = showPoint.value;
Time = 30;
Point = 0;

function gameOver() {
	gameStop();
	clear();
	alert("Game Over.\n" + "Your score is: " + Point);
	isStart = false;
	Time = 30;
	Point = 0;
	State.innerText = "Game Over";
	showPoint.innerText = Point;
	showTime.innerText = Time;
}

function display() {
	if(Time <= -1) {
		gameOver();
		return;
	}
	else {
		showTime.innerText = Time;
		Time--;
		TimeOne = setTimeout("display()",1000);
	}
}

function clear() {
	for(var i = 0 ; i < 60 ; i++) {
		Mouse[i].style.backgroundColor = "#2B2F5B";
		Mouse[i].style.style = "pointer";
	}
}

function gameStop() {
	State.innerText = "Game Over";
	clearInterval(InterOne);
	clearTimeout(TimeOne);
}

function Appear() {
	if(isStart) {
		var numb = parseInt(60*Math.random());
		Mouse[numb].style.backgroundColor = '#FF99CC';
		Mouse[numb].style.cursor = "pointer";
		setTimeout(function(){
			Mouse[numb].style.backgroundColor = '#2B2F5B';
			Mouse[numb].style.cursor = "default";
		},1000);
	}	
}

function gameStart() {
	State.innerText = "Playing";
	isStart = true;
	InterOne = setInterval(function(){Appear()},1000);
	display();
}

	
EventUtil.addHandler(Button,'click',function(){
	if(!isStart) {
		gameStart();
	}
	else if(isStart) {
		gameStop();
		Time++;
		isStart = false;
	}
});

for(var m = 0 ; m < 60 ; m++) {
	(function(i) {
		Mouse[i].onclick = function() {
			if(isStart) {
				if(Mouse[i].style.backgroundColor == "rgb(255, 153, 204)") {
					Mouse[i].style.backgroundColor = "#2B2F5B";
					Mouse[i].style.cursor = "default";
					Point++;
					showPoint.innerText = Point;
				}

				else {
					Point--;
					showPoint.innerText = Point;
				}
			}
		}
	})(m)
}