var number = [];
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
	var order = getButtonFunction();
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
	for(i in number) {
		if(number[i] != null) {
			number[i].abort();
		}	
	}
}

function getButtonFunction() {
	var order = [];
	var button = $("#control-ring").find('li');
	for(var i = 0 ; i < button.length ; i++) {
		order[i] = function(i) {
			$(".apb").off();
			return function() {
				var text = $(button[i]).find("span");
				text.show();
				var myRand = Math.round(Math.random() * 1000);
				number[i] = $.ajax({url: myRand, context: text, success: function() {
					if(number[i] != null) {
						if($(this).parent().prop("Number") === "none") {
								$(this).parent().prop("Number",number[i].responseText);
								$(this).parent().removeClass();
								$(this).parent().addClass("button_r");
								$(this).text(number[i].responseText);
								getAllButtonSum();	
						}
					}
				}})
			}
		}(i)
	}
	return order;
}

function getAllButtonSum() {
	var sum = 0;
	var isOk = true;
	$("#control-ring").find('li').each(function() {
		if($(this).prop("Number") === "none") {
			isOk = false;
		}
	})
	if(isOk) {
		$("#control-ring").find('li').each(function() {
			sum += parseInt($(this).prop("Number"));
		})
		$(".info").text(sum);		
	}
}

function clickAllButton(order) {
	$(".apb").off();
	for(i in order) {
		order[i]();
	}
}