$(function() {
	$(this).find('li').each(function() {
		$(this).find('span').hide();
	});
	$("#at-plus-container").hover(start,finish);
});

/*点击气泡后的初始化函数，给每个按钮添加属性*/
function start() {
	$(this).find('li').each(function() {
		$(this).prop("Number","none");
		$(this).click(getNumber);
		$(this).find('span').text("...");
		$(this).removeClass();
		$(this).addClass("button");
	});
	$("#info-bar").click(getAllSmallBubbleSum);
	$(".info").text("");
}

/*离开大气泡以后，全部结果归零*/
function finish() {
	$(this).find('li').each(function() {
		$(this).find('span').hide();
		$(this).removeClass();
		$(this).addClass("button");
	});
	$("#info-bar").removeClass();
	$("#info-bar").addClass("info-bar-color-one");
}

/*给气泡获得随机数*/
function getNumber() {
	if($(event.target).prop("Number") == "none") {
		changeSmallBubbleColor('button_r');
		$(this).find('span').show();
		$(this).removeClass();
		$(this).addClass("button");
		getRandom.call(event.target);
	}
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

/*给小气泡获取随机数*/
function getRandom() {
	var text = $(this).find('span');
	$("#control-ring").find('li').each(function() {
		$(this).off('click',getNumber);
	})
	var number = $.ajax({url: "/rand", context: text, success: function() {
		console.log(this);
		if($(this).parent().prop("Number") === "none") {
			$(this).parent().prop('Number', number.responseText);
			$(this).parent().removeClass();
			$(this).parent().addClass("button_r");
			$(this).text(number.responseText);
			changeSmallBubbleColor("button");
			$("#control-ring").find('li').each(function() {
				if($(this).prop('Number') === 'none') {
					$(this).click(getNumber);
				}
			})	
			changeBigBubbleColor();			
		}
	}});
}

/*改变大气泡的颜色函数*/
function changeBigBubbleColor() {
	var isTheBubbleClick = true;
	$("#control-ring").find('li').each(function() {
		if($(this).prop("Number") == "none") {
			isTheBubbleClick = false;
		}
	})
	console.log(isTheBubbleClick);
	if(isTheBubbleClick) {
		console.log("Enter");
		$("#info-bar").removeClass();
		$("#info-bar").addClass("info-bar-color-two");
	}
}

/*大气泡求和函数*/
function getAllSmallBubbleSum() {
	var ok = true;
	var sum = 0;
	$("#control-ring").find('li').each(function() {
		if($(this).prop('Number') === 'none') {
			ok = false;
		}
	});

	if(ok) {
		$("#control-ring").find('li').each(function() {
			sum += parseInt($(this).prop('Number'));
		});
		$(".info").text(sum);
		$("#info-bar").removeClass();
		$("#info-bar").addClass("info-bar-color-one");
	};
}