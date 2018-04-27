var expression = ""; //The results of the string.
var lastSymbol = ''; //Record the last symbol.

function processExpress() {
	if(event.srcElement.innerText == '←') {
		if(expression.length > 0) {
			expression = expression.substring(0,expression.length-1);
			lastSymbol = expression.charAt(expression.length-1);
			document.getElementById("screen").innerText = expression;
		}
	}

	else if(event.srcElement.innerText == 'CE') {
			expression = "";
			lastSymbol = '';
			document.getElementById("screen").innerText = expression;
	}

	else if(event.srcElement.innerText == '=') {
		if(expression == "") {
			return;
		}

		if(!isBrackMatch() || isExistOtherSymbol() || checkFirstAndLast() || checkZero() || checkOneSymbol() || checkBra() || checkLast() || hasOperation() || isBracketNext()) {
			return;
		}

		else {
			var number = eval(expression);	
			expression = number.toString();
			var check = expression.match(/\.(\d*?)(9|0)\2{5,}(\d{1,5})$/);
			if(check != null) {
				number = number.toFixed(check[1].length) - 0;
				expression = number.toString();
			}
			if(expression == "Infinity" || expression == "NaN" || expression == "-Infinity") {
				document.getElementById("screen").innerText = "除数不能为0.";
				expression = "0";
			}
			else {
				document.getElementById("screen").innerText = expression;
			}
		}
	}

	else {
		var checkLastSymbol = /(\+|\-|\*|\/|\.)/; //check whether the last one is a symbol.
		if(event.srcElement.innerText.match(checkLastSymbol) && lastSymbol.match(checkLastSymbol)) {
			return;		
		} //The last one and this one are both symbol.

		else if(event.srcElement.innerText == '.' || event.srcElement.innerText == '*' || event.srcElement.innerText == '/') {
			if(event.srcElement.innerText == '.') {
				for(var i = expression.length-1 ; i >= 0 ; i--) {
					if(expression.charAt(i) >= '0' && expression.charAt(i) <= '9') {
						continue;
					}
					else if(expression.charAt(i) == '.') {
						return;
					}
					else {
						break;
					}
				}
			}

			if(lastSymbol == '(') {
				return;
			}

			else if(lastSymbol == ')') {
				if(event.srcElement.innerText == '.') {
					return;
				}
				else {
					if(expression.length <= 17) {
						lastSymbol = event.srcElement.innerText;
						expression += event.srcElement.innerText;
						document.getElementById("screen").innerText = expression;				
					}		
				}
			}

			else {
				if(expression.length <= 17) {
					lastSymbol = event.srcElement.innerText;
					expression += event.srcElement.innerText;
					document.getElementById("screen").innerText = expression;				
				}				
			}
		}

		else {
			if(expression.length <= 17) {
				lastSymbol = event.srcElement.innerText;
				expression += event.srcElement.innerText;
				document.getElementById("screen").innerText = expression;				
			}
		}
	}
}

function isBrackMatch() {
	Stack = new Array();
	for(var i = 0 ; i < expression.length ; i++) {
		if(expression.charAt(i) == '(') {
			Stack.push('(');
		}
		else if(expression.charAt(i) == ')') {
			if(Stack.length == 0) {
				document.getElementById("screen").innerText = "表达式中括号不匹配！";
				return false;
			}
			Stack.pop();
		}
	}
	if(Stack.length != 0) {
		document.getElementById("screen").innerText = "表达式中括号不匹配！";
		return false;
	}
	return true;
}

function isExistOtherSymbol() {
	for(var i = 0 ; i < expression.length ; i++) {
		if(!(expression.charAt(i) >= '0' && expression.charAt(i) <= '9') && expression.charAt(i) != '+' && expression.charAt(i) != '-' && expression.charAt(i) != '*' && expression.charAt(i) != '/' && expression.charAt(i) != '.' && expression.charAt(i) != '(' && expression.charAt(i) != ')') { //Not Number.
			document.getElementById("screen").innerText = "表达式中含有非法字符！";
			return true;
		}
	}
	return false;
}

function checkFirstAndLast() {
	var checkOne = /^[\*|\/].+/;
	var checkTwo = /.+[\*|\/|\+|\-|\.]$/;
	if(expression.match(checkOne) || expression.match(checkTwo)) {
		document.getElementById("screen").innerText = "输入表达式非法!";
		return true;
	}
	return false;	
}

function checkZero() {
	if(expression.length >= 3) {
		/*if(expression.charAt(0) == '0' && expression.charAt(1) == '0') {
			document.getElementById("screen").innerText = "输入表达式非法!";
			return true;
		}*/
		for(var i = 0 ; i < expression.length ; i++) {
			if(expression.charAt(i) == '.') {
				var count = 0;
				for(var j = i-1 ; j >= 0 ; j--) {
					if(expression.charAt(j) == '0') {
						count++;
						if(j == 0) {
							if(count > 1) {
								document.getElementById("screen").innerText = "输入表达式非法!";
								return true;								
							}
							else {
								break;
							}
						}
					}
					else if(expression.charAt(j) >= '0' && expression.charAt(j) <= '9') break;
					else {
						if(count > 1) {
							document.getElementById("screen").innerText = "输入表达式非法!";
							return true;
						}
						else break;
					}
				}
			}
		}
	}
	return false;
}

function checkOneSymbol() {
	if(expression.length == 1) {
		if(expression.charAt(0) == '+' || expression.charAt(0) == '-' || expression.charAt(0) == '*' || expression.charAt(0) == '/' || expression.charAt(0) == '.') {
			document.getElementById("screen").innerText = "输入表达式非法!";
			return true;
		}
	}
	return false;
}

function checkBra() {
	if(expression.length >= 3) {
		for(var i = 0 ; i < expression.length ; i++) {
			if(expression.charAt(i) == ')') {
				if(expression.charAt(i-1) == '+' || expression.charAt(i-1) == '-' && expression.charAt(i-2) == '(') {
					document.getElementById("screen").innerText = "输入表达式非法!";
					return true;
				}
			}
		}
	}
	return false;
}

function checkLast() {
	if(expression.length >= 3) {
		for(var i = 0 ; i < expression.length ; i++) {
			if(expression.charAt(i) == ')') {
				if(expression.charAt(i-1) == '+' || expression.charAt(i-1) == '-' || expression.charAt(i-1) == '*' || expression.charAt(i-1) == '/' || expression.charAt(i-1) == '.') {
					document.getElementById("screen").innerText = "输入表达式非法!";
					return true;
				}
			}
		}
	}
	return false;	
}

function hasOperation() {
	for(var i = 0 ; i < expression.length ; i++) {
		if(expression.charAt(i) == '(') {
			if(i >= 1 && ((expression.charAt(i-1) >= '0' && expression.charAt(i-1) <= '9') || expression.charAt(i-1) == '.')) {
				document.getElementById("screen").innerText = "输入表达式非法!";
				return true;
			}
		}

		if(expression.charAt(i) == ')') {
			if(i < expression.length-1 && (expression.charAt(i+1) >= '0' && expression.charAt(i+1) <= '9')) {
				document.getElementById("screen").innerText = "输入表达式非法!";
				return true;
			}
		}
	}
	return false;
}

function isBracketNext() {
	if(expression.length >= 2) {
		for(var i = 0 ; i < expression.length ; i++) {
			if(expression.charAt(i) == ')' && expression.charAt(i-1) == '(') {
				document.getElementById("screen").innerText = "输入表达式非法!";
				return true;
			}
		}
	}
	return false;
}