$(function() {
	var Num = getCurrentNumber(); //null
	setFunctionProperty.call(null,Num);
	$("#control-ring").find('li').each(function(){
		$(this).find('span').hide();
	})
	/*通过bind传递参数*/
	$("#at-plus-container").hover(start.bind(null,Num),finish.bind(null,Num));
})

/*给每个按键绑定属性*/
function setFunctionProperty() {
	$("#A").prop("Function",function() {
		return AHandler;
	})
	$("#B").prop("Function",function() {
		return BHandler;
	})
	$("#C").prop("Function",function() {
		return CHandler;
	})
	$("#D").prop("Function",function() {
		return DHandler;
	})
	$("#E").prop("Function",function() {
		return EHandler;
	})
}

function start(Num) {
	$(this).find('li').each(function() {
		/*给每个按键添加属性Number*/
		$(this).prop("Number","none");
		/*把每个span的内容重置为...并且隐藏*/
		$(this).find('span').text("...");
		$(this).find('span').hide();
		/*重置每个按键的颜色*/
		$(this).removeClass();
		$(this).addClass("button");
	});
	/*将要显示的信息清除并隐藏*/
	$("#message-order").text("");
	$("#message-order").hide();
	/*将计算结果清零*/
	$(".info").text("");
	$(".apb").click(clickAllButtonRandom.bind(null,Num));
}

function finish(Num) {
	/*去除apb的点击事件*/
	$(".apb").off();
	$("#message").text("");
	$("#message-order").text("");
	$("#message-order").hide();
	$("#control-ring").find("li").each(function() {
		$(this).off();
		$(this).find('span').hide();
	})
	var number = getCurrentNumber();
	if(number() != null) {
		number().abort();
	}
}

function clickAllButtonRandom(Num) {
	$(".apb").off();
	var button = $("#control-ring").find('li');
	button.sort(function(x,y) {
		return Math.random() > 0.5 ? 1 : -1;
	});
	var Sum = getCurrentSum();
	console.log("First Sum" + Sum());
	for(var i = 0 ; i < button.length-1 ; i++) {
		$(button[i]).on('done',$(button[i+1]).prop('Function').bind(null,Num,Sum));
	}
	$(button[button.length-1]).on('done',bubbleHandler.bind(null,Sum));
	$(button[0]).prop("Function").call(null,Num,Sum);
	var text = "Order : ";
	$(button).each(function() {
		text = text + $(this).text()[0] + " ";
	})
	$("#message-order").text(text);
	$("#message-order").show();
}

function bubbleHandler(Sum) {
	try {
		var sum = Sum();
		console.log(sum);
		$(".info").text(sum);
		if(0.5 - Math.random() > 0) {
			throw new ErrMessage("楼主异步调用战斗力感人, 目测超过",sum);
		}
		else {
			$("#message").text("楼主异步调用战斗力感人, 目测不超过" + sum);
		}
	}
	catch(ErrMessage) {
		$("#message").text(ErrMessage.message + ErrMessage.sum);
	}
}

function ErrMessage(Message,Sum) {
	this.message = Message;
	this.sum = Sum;
}

/*A~E的处理函数*/
function AHandler(Num,Sum) {
	var text = $("#A").find('span');
	try {
		changeSmallBubbleColor("button_r")
		$("#A").removeClass();
		$("#A").addClass("button");
		var number = $.ajax({url: '/rand', context: text, success: function() {
			$(this).show();
			if(Num() != null) {
				console.log(number.responseText);
				$(this).parent().prop("Number",number.responseText);
				$(this).parent().removeClass();
				$(this).parent().addClass("button_r");
				$(this).text(number.responseText);
				changeSmallBubbleColor("button");
				Sum(number.responseText);
				$("#A").trigger("done");
			}
		}})
		Num(number);
		if(0.5 - Math.random() > 0) {
			throw new ErrMessage("这不是一个天大的秘密",Sum());
		}
		else {
			$("#message").text("这是一个天大的秘密");
		}
	}
	catch(ErrMessage) {
		$("#message").text(ErrMessage.message);
	}
}

function BHandler(Num,Sum) {
	var text = $("#B").find('span');
	try {
		changeSmallBubbleColor("button_r")
		$("#B").removeClass();
		$("#B").addClass("button");
		var number = $.ajax({url: '/rand', context: text, success: function() {
			$(this).show();
			if(Num() != null) {
				$(this).parent().prop("Number",number.responseText);
				$(this).parent().removeClass();
				$(this).parent().addClass("button_r");
				$(this).text(number.responseText);
				changeSmallBubbleColor("button");
				Sum(number.responseText);
				$("#B").trigger("done");
			}
		}})
		Num(number);
		/*50%概率失败*/
		if(0.5 - Math.random() > 0) {
			throw new ErrMessage("我知道",Sum());
		}
		else {
			$("#message").text("我不知道");
		}
	}
	catch(ErrMessage) {
		$("#message").text(ErrMessage.message);
	}
}

function CHandler(Num,Sum) {
	var text = $("#C").find('span');
	try {
		changeSmallBubbleColor("button_r")
		$("#C").removeClass();
		$("#C").addClass("button");
		var number = $.ajax({url: '/rand', context: text, success: function() {
			$(this).show();
			if(Num() != null) {
				$(this).parent().prop("Number",number.responseText);
				$(this).parent().removeClass();
				$(this).parent().addClass("button_r");
				$(this).text(number.responseText);
				changeSmallBubbleColor("button");
				Sum(number.responseText);
				$("#C").trigger("done");
			}
		}})
		Num(number);
		if(0.5 - Math.random() > 0) {
			throw new ErrMessage("你知道",Sum());
		}
		else {
			$("#message").text("你不知道");
		}
	}
	catch(ErrMessage) {
		$("#message").text(ErrMessage.message);
	}
}

function DHandler(Num,Sum) {
	var text = $("#D").find('span');
	try {
		changeSmallBubbleColor("button_r")
		$("#D").removeClass();
		$("#D").addClass("button");
		var number = $.ajax({url: '/rand', context: text, success: function() {
			$(this).show();
			if(Num() != null) {
				$(this).parent().prop("Number",number.responseText);
				$(this).parent().removeClass();
				$(this).parent().addClass("button_r");
				$(this).text(number.responseText);
				changeSmallBubbleColor("button");
				Sum(number.responseText);
				$("#D").trigger("done");
			}
		}})
		Num(number);
		if(0.5 - Math.random() > 0) {
			throw new ErrMessage("他知道",Sum());
		}
		else {
			$("#message").text("他不知道");
		}
	}
	catch(ErrMessage) {
		$("#message").text(ErrMessage.message);
	}
}

function EHandler(Num,Sum) {
	var text = $("#E").find('span');
	try {
		changeSmallBubbleColor("button_r")
		$("#E").removeClass();
		$("#E").addClass("button");
		var number = $.ajax({url: '/rand', context: text, success: function() {
			$(this).show();
			if(Num() != null) {
				$(this).parent().prop("Number",number.responseText);
				$(this).parent().removeClass();
				$(this).parent().addClass("button_r");
				$(this).text(number.responseText);
				changeSmallBubbleColor("button");
				Sum(number.responseText);
				$("#E").trigger("done");
			}
		}})
		Num(number);
		if(0.5 - Math.random() > 0) {
			throw new ErrMessage("这不是一个天大的秘密",Sum());
		}
		else {
			$("#message").text("这不是一个天大的秘密");
		}
	}
	catch(ErrMessage) {
		$("#message").text(ErrMessage.message);
	}
}

/*获取当前数字*/
function getCurrentNumber() {
	var number = null;
	return function(num) {
		if(typeof num != 'undefined') {
			number = num;
		}
		else {
			return number;
		}
	}
}

/*获取当前的和*/
function getCurrentSum() {
	var currentSum = 0;
	return function(num) {
		if(typeof(num) != 'undefined') {
			currentSum += parseInt(num);
		}
		else {
			return currentSum;
		}
	}
}

/*改变小气泡的颜色*/
function changeSmallBubbleColor(name) {
	$("#control-ring").find('li').each(function() {
		if($(this).prop("Number") === "none") {
			$(this).removeClass();
			$(this).addClass(name);
		}
	});
}