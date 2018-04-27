var number = null;
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
	var order = orderClick();
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
	$("#info-bar").removeClass();
	$("#info-bar").addClass("info-bar-color-one");
	/*停止ajax*/
	if(number != null) {
		number.abort();
	}
}

function orderClick() {
	var order = [];
	var button = $("#control-ring").find('li');
	for(var i = 0 ; i < button.length ; i++) {
		order[i] = function(i) {
			$(".apb").off();
			return function() {
				var text = $(button[i]).find("span");
				text.show();
				changeSmallBubbleColor("button_r");
				$(button[i]).removeClass();
				$(button[i]).addClass("button");
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
		getBigBubbleSum();
	}
	return order;
}

function getBigBubbleSum() {
	var sum = 0;
	$("#control-ring").find('li').each(function() {
		sum += parseInt($(this).prop("Number"));
	})
	$(".info").text(sum);
	$("#info-bar").removeClass();
	$("#info-bar").addClass("info-bar-color-one");
}

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