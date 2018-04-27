var number = null;
var message = "Order : ";
$(function() {
	/*将所有的红色按钮隐藏起来*/
	$(this).find('li').each(function() {
		$(this).find('span').hide();
	});
	$("#at-plus-container").hover(start,finish);
});

/*触碰后的触发函数*/
function start() {
	$(this).find('li').each(function() {
		/*给每个按键添加属性Number*/
		$(this).prop("Number","none");
		$(this).find('span').text("...");
		$(this).find('span').hide();
		$(this).removeClass();
		$(this).addClass("button");
	});
	$(".info").text("");
	var order = getRandomNumberFunction();
	message = "Order : ";
	$(".apb").click(clickAllButton.bind(null,order));
}

/*结束计算后把计算结果清零，并且把相应的数字小圆圈隐藏*/
function finish() {
	$(this).find('li').each(function() {
		$(this).find('span').hide();
		/*变回蓝色小圆圈*/
		$(this).removeClass();
		$(this).addClass("button");
	});	
	$(".apb").off();
	$("#message").hide();
	/*停止ajax*/
	if(number != null) {
		number.abort();
	}
}

function getRandomNumberFunction() {
	var order = [];
	var array = [0,1,2,3,4];
	array.sort(function(x,y) {
		return Math.random() > 0.5 ? -1 : 1;
	})
	var button = $("#control-ring").find('li');
	for(var i = 0 ; i < array.length ; i++) {
		message = message + $(button[array[i]]).text()[0] + " ";
	}
	document.getElementById("message").innerText = message;
	//$("#at-plus-container").text(message);
	$("#message").show();
	for(var i = 0 ; i < button.length ; i++) {
		order[i] = function(i) {
			$(".apb").off();
			return function() {
				var text = $(button[array[i]]).find("span");
				text.show();
				changeSmallBubbleColor("button_r");
				$(button[array[i]]).removeClass();
				$(button[array[i]]).addClass("button");
				number = $.ajax({url: '/rand', context: text, success: function() {
					if(number != null) {
						if($(this).parent().prop("Number") === "none") {
								$(this).parent().prop("Number",number.responseText);
								$(this).parent().removeClass();
								$(this).parent().addClass("button_r");
								$(this).text(number.responseText);
								changeSmallBubbleColor("button");
								order[i+1]();		
						}
					}
				}})
			}
		}(i)
	}
	order[5] = function() {
		getAllBubbleSum();
	}
	return order;
}

/*计算小圆圈的和*/
function getAllBubbleSum() {
	var isBigBubbleCanSum = true;
	$("#control-ring").find('li').each(function() {
		if($(this).prop("Number") == "none") {
			isBigBubbleCanSum = false;
		}
	})
	if(isBigBubbleCanSum) {
		var sum = 0;
		$("#control-ring").find('li').each(function() {
			sum += parseInt($(this).prop("Number"));
		})
		$(".info").text(sum);
	}
}

/*机器人操作*/
function clickAllButton(order) {
	$(".apb").off();
	order[0]();
}

/*改变气泡的CSS*/
function changeSmallBubbleColor(name) {
	$("#control-ring").find('li').each(function() {
		if($(this).prop("Number") === "none") {
			$(this).removeClass();
			$(this).addClass(name);
		}
	});
}