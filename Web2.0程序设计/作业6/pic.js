var myTitle = document.getElementById("title");
var picture = document.getElementsByClassName("puzzle");
var count = document.getElementById("count");
var isStart = false;
var TimeOne = null;
var best = 9999;
var Time = 0;
var last = document.getElementById("P16");
$("#Button").click(gameStart);
$("#ButtonTwo").click(function() {
	alert("Your Best Time is : " + best);
});
$("#ButtonThr").click(gameover);
$("#ButtonFor").click(restart);
for(var i = 0 ; i < 16 ; i++) {
	picture[i].addEventListener("click",move,false);
}

function display() {
	myTitle.innerText = "Time : " + Time + "s";
	Time++;
	TimeOne = setTimeout("display()",1000);
}

function gameStart() {
	isStart = true;
	clearTimeout(TimeOne);
	Time = 0;
	array = new Array(1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16);
	for(var i = 0 ; i < 16 ; i++) {
		picture[i].className = "position" + array[i] +" puzzle";
	}
	myTitle.innerText = "Time : " + Time + "s";
	while(1) {
		array.sort(function(x,y) {
			return Math.random() > 0.5 ? -1:1;
		});	
		if(isValid()) {
			break;
		}	
	}
	
	for(var i = 0 ; i < 16 ; i++) {
		picture[i].className = "position" + array[i] +" puzzle";
	}
	display();
}

function isValid() {
	var sum = 0;
	for(var i = 0 ; i < 16 ; i++) {
		for(var j = i+1 ; j < 16 ; j++) {
			if(array[j] < array[i]) {
				sum++;
			}
		}
	}
	var a = array[15] - 1;
	var temp =  a%4 + parseInt(a/4);
	sum += temp;
	return sum % 2 == 0;
}

function move(event) {
	var lastTop = last.offsetTop;
	var lastLeft = last.offsetLeft;
	var myTop = this.offsetTop;
	var myLeft = this.offsetLeft;
	if((Math.abs(lastLeft - myLeft) == 87 && Math.abs(lastTop - myTop) == 0) || (Math.abs(lastTop - myTop) == 88 && Math.abs(lastLeft - myLeft) == 0)) {
		var temp = this.className;
		this.className = last.className;
		last.className = temp;
	}
	if(success() && this.id != "P16" && isStart) {
		myTitle.innerText = "You Win!";
		if(Time <= best) {
			best = Time;
		}
		clearTimeout(TimeOne);
	}
	else{
		if(isStart)
		myTitle.innerText = "Time : " + Time + "s";
	}
}

function success() {
	var count = 0;
	for(var i = 1 ; i <= 16 ; i++) {
		var temp = "position" + i + " puzzle";
		if(picture[i-1].className == temp) {
			count++;
		}
	}
	return count == 16;
}

function gameover() {
	isStart = false;
	myTitle.innerText = "拼图游戏";
	clearTimeout(TimeOne);
}

function restart() {
	isStart = false;
	clearTimeout(TimeOne);
	myTitle.innerText = "拼图游戏";
	for(var i = 1 ; i <= 16 ; i++) {
		picture[i-1].className = "position" + i +" puzzle";
	}	
}
