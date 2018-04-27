function checkData() {
	var flag = true;
	var username = $("#username").val();
	var studentId = $("#studentId").val();
	var phone = $("#phone").val();
	var email = $("#email").val();
	var password = $("#password").val();
	var repeat = $("#repeat").val();
	/*username 的检验*/

	if(!(/^[a-zA-Z]\w{5,17}$/.test(username))) {
		$("#username").next("span").text("用户名不合法");
		flag = false;
	}
	else {
		$("#username").next("span").text("");
	}

	if(!(/^[1-9][0-9]{7}$/.test(studentId))) {
		$("#studentId").next("span").text("学号不合法");
		flag = false;
	}
	else {
		$("#studentId").next("span").text("");
	}

	if(!(/^[1-9][0-9]{10}$/.test(phone))) {
		$("#phone").next("span").text("电话号不合法");
		flag = false;
	}
	else {
		$("#phone").next("span").text("");
	}

	if(!(/^[0-9a-zA-Z_\-]+@(([0-9a-zA-Z_\-])+\.)+[a-zA-Z]{2,4}$/.test(email))) {
		$("#email").next("span").text("邮箱不合法");
		flag = false;
	}
	else {
		$("#email").next("span").text("");
	}

	if(!(/^[0-9a-zA-Z\-_]{6,12}$/.test(password))) {
		$("#password").next("span").text("密码不合法");
		flag = false;
	}
	else {
		$("#password").next("span").text("");
	}

	if(password != repeat) {
		$("#repeat").next("span").text("密码不一致");
		flag = false;
	}
	else {
		$("#repeat").next("span").text("");
	}

	if(flag) {
		return true;
	}

	else {
		return false;
	}
}


window.onload = function() {
	document.getElementById("reset").onclick = function() {
		$("#username").val("");
		$("#studentId").val("");
		$("#phone").val("");
		$("#email").val("");
		$("#password").val("");
		$("#repeat").val("");
		$("#username").next("span").text("");
		$("#studentId").next("span").text("");
		$("#phone").next("span").text("");
		$("#email").next("span").text("");
		$("#password").next("span").text("");
		$("#repeat").next("span").text("");
	};

	$("#explain").click(function() {
		alert("用户名6~18位英文字母、数字或下划线，必须以英文字母开头\n" + 
			  "学号8位数字，不能以0开头\n" + 
			  "电话11位数字，不能以0开头\n" +
			  "邮箱格式遵循国际标准\n" + 
			  "密码为6~12位数字、大小写字母、中划线、下划线\n");
	})
}