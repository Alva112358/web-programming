window.onload = function() {
	var isOver = false;
	var flag = true;
	var content = document.getElementById("result");
	var start = document.getElementById("start");
	start.onmouseover = function() {
		isOver = false;
		content.innerText = "";
		myDiv = document.getElementById("maze");
		myDiv.style.cursor = 'pointer';
		myDiv.onmouseout = function(event){
  			var div = document.getElementById("maze");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if( x < divx1 || x > divx2 || y < divy1 || y > divy2 ){
 		  		flag = false;
			}
		}	

		myDiv.onmouseover = function(event){
  			var div = document.getElementById("maze");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if( x >= divx1 && x <= divx2 && y >= divy1 && y <= divy2 ){
 		  		flag = true;
			}
		}

		div1 = document.getElementById("maze_1");
		div1.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_1");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2)){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div1.style.backgroundColor = "#99CC66";
			}
			return;
		}

		div1.onmouseout = function(event) {
  			var div = document.getElementById("maze_1");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div1.style.backgroundColor = "#368590";
			}			
		}

		div2 = document.getElementById("maze_2");
		div2.onmouseover = function(event) {
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_2");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div2.style.backgroundColor = "#99CC66";
			}
		}

		div2.onmouseout = function(event) {
  			var div = document.getElementById("maze_2");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div2.style.backgroundColor = "#368590";
			}			
		}

		div3 = document.getElementById("maze_3");
		div3.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_3");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div3.style.backgroundColor = "#99CC66";
			}
		}

		div3.onmouseout = function(event) {
  			var div = document.getElementById("maze_3");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div3.style.backgroundColor = "#368590";
			}			
		}

		div4 = document.getElementById("maze_4");
		div4.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_4");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div4.style.backgroundColor = "#99CC66";
			}
		}

		div4.onmouseout = function(event) {
  			var div = document.getElementById("maze_4");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div4.style.backgroundColor = "#368590";
			}			
		}

		div5 = document.getElementById("maze_5");
		div5.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_5");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div5.style.backgroundColor = "#99CC66";
			}
		}

		div5.onmouseout = function(event) {
  			var div = document.getElementById("maze_5");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div5.style.backgroundColor = "#368590";
			}			
		}

		div6 = document.getElementById("maze_6");
		div6.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_6");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div6.style.backgroundColor = "#99CC66";
			}
		}

		div6.onmouseout = function(event) {
  			var div = document.getElementById("maze_6");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div6.style.backgroundColor = "#368590";
			}			
		}

		div7 = document.getElementById("maze_7");
		div7.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_7");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div7.style.backgroundColor = "#99CC66";
			}
		}

		div7.onmouseout = function(event) {
  			var div = document.getElementById("maze_7");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div7.style.backgroundColor = "#368590";
			}			
		}

		div8 = document.getElementById("maze_8");
		div8.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_8");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div8.style.backgroundColor = "#99CC66";
			}
		}

		div8.onmouseout = function(event) {
  			var div = document.getElementById("maze_8");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div8.style.backgroundColor = "#368590";
			}			
		}

		div9 = document.getElementById("maze_9");
		div9.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("maze_9");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		content.innerText = "You Lose";
 		  		isOver = true;
 		  		div9.style.backgroundColor = "#99CC66";
			}
		}

		div9.onmouseout = function(event) {
  			var div = document.getElementById("maze_9");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(x < divx1 || x > divx2 || y < divy1 || y > divy2){
 		  		div9.style.backgroundColor = "#368590";
			}			
		}

		div10 = document.getElementById("end");
		div10.onmouseover = function(event){
			myDiv.style.cursor = 'default';
  			var div = document.getElementById("end");
		    var x = event.clientX;
 		   	var y = event.clientY;
 		  	var divx1 = div.offsetLeft;
 	  		var divy1 = div.offsetTop;
 		   	var divx2 = div.offsetLeft + div.offsetWidth;
 		   	var divy2 = div.offsetTop + div.offsetHeight;
 		  	if(!isOver && (x < divx1 || x > divx2 || y < divy1 || y > divy2) ){
 		  		if(flag) {
 		  			content.innerText = "You Win";
 		  		}
 		  		else {
 		  			content.innerText = "Don't cheat,you should start from the 'S' and move to the 'E' inside the maze."
 		  		}
			}
			isOver = true;
		}
	}
}