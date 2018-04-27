var fs = require('fs');
var url = require("url");
var http = require("http");
var querystring = require('querystring');
/*储存信息JSON的数组*/
var users = {}; 


/*搭建服务器,POST方法*/
http.createServer(function(request, response) {
	if(request.method == "POST") {
		addUsers(request,response);
	}
	else {
		showPage(request,response);
	}
}).listen(8000);


/*用户注册*/
function addUsers(request,response) {
	request.on('data', function(chunk) {
			var user = parseUserToJson(chunk.toString());

			/*校验是否有重复数据的存在*/
			var ok = true;
			var error_username = "";
			var error_studentId = "";
			var error_phone = "";
			var error_email = "";
			var original_1 = user.username;
			var original_2 = user.studentId;
			var original_3 = user.phone;
			var original_4 = user.email;
			for(var key in users) {
				if(users[key].username == user.username) {
					error_username = "用户已注册";
					ok = false;
				}
				if(users[key].studentId == user.studentId) {
					error_studentId = "学号已注册";
					ok = false;
				}
				if(users[key].phone == user.phone) {
					error_phone = "电话已注册";
					ok = false;
				}
				if(users[key].email == user.email) {
					error_email = "邮箱已注册";
					ok = false;
				}
			}

			/*如果校验成功，则将用户存放在users数组中存储，注册成功*/
			if(ok) {
				users[user.username] = user;
				response.writeHead(301, {Location: '?username=' + user.username});
				response.end();					
			}

			/*如果校验失败，则返回注册页面，并且在注册页面显示相应的错误信息*/
			else {
				createMainHTML(response,error_username,error_studentId,error_phone,error_email,original_1,original_2,original_3,original_4);
			}
	});
}

/*显示页面的选择函数*/
function showPage(request,response) {
	var username = querystring.parse(url.parse(request.url).query).username;;
	/*如果用户不存在或者用户没有注册，则均显示注册页面*/
	if(!username || !!!users[username]) {
		var pathname = request.url;
		if(pathname == '/') {
			pathname = "./signUp.html";
		}
		else {
			pathname = '.' + pathname;
		}
		var file = pathname;
		fs.readFile(file, function(err,data) { 
			if(err) {
				response.writeHead(301, {Location: '/'});
				response.end();
			}

			else if(file.indexOf("html") != -1){
				createMainHTML(response,"","","","","","","","");
			}
			else if(file.indexOf("css") != -1){
				response.writeHead(200,{'Context-Type': 'text/css;charset = "utf-8"'});
				response.write(data);
				response.end();
			}
			else if(file.indexOf("js") != -1){
				response.writeHead(200,{'Context-Type': 'text/js;charset=utf-8'});
				response.write(data);
				response.end();
			}
		})
	}

	/*如果存在该注册用户，显示该用户的用户详情界面*/
	else {
		var pathname = request.url;
		if(pathname == '/' || pathname.indexOf("/?username=") != -1) {
			pathname = "./detail.html";
		}
		else {
			pathname = '.' + pathname;
		}
		var file = pathname;
		fs.readFile(file, function(err,data) { 
			if(err) {
				response.writeHead(301, {Location: '/'});
				response.end();
			}

			else if(file.indexOf("html") != -1) {
				createDetailHTML(response,users[username].username,users[username].studentId,users[username].phone,users[username].email);		
			}

			else if(file.indexOf("css") != -1){
				response.writeHead(200,{'Context-Type': 'text/css;charset = "utf-8"'});
				response.write(data);
				response.end();
			}
		})
	}
}

/*辅助成员方法函数*/
/*将POST转换为相应的JSON*/
function parseUserToJson(message) {
	params = querystring.parse(message);
	return params;
}

/*创建动态HTML辅助函数-->注册页面*/
function createMainHTML(response,message_1,message_2,message_3,message_4,
	original_1,original_2,original_3,original_4) {
	response.writeHead(200, {'Content-Type':'text/html'});
	response.write("<!DOCTYPE \"html\">");
	response.write("<html>");
	response.write("<head>");
	response.write("<meta charset=\"UTF-8\">");
	response.write("<script src=\"http://cdn.static.runoob.com/libs/jquery/1.10.2/jquery.min.js\">");
	response.write("</script>");
	response.write("<script src = \"signUp.js\" type = \"text/JavaScript\">")
	response.write("</script>")
	response.write("<title>注册页面</title>");
	response.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"signUp.css\">");
	response.write("<link rel = \"Shortcut Icon\" href = \"https://courses.cs.washington.edu/courses/cse190m/09sp/homework/1/pie_icon.gif\" type = \"image/x-icon\">");
	response.write("</head>");

	response.write("<body>");
		response.write("<div id = \"SignUp\">")
		response.write("<h1>注册</h1>");
		response.write("<form id = \"data\" method = \"post\" onsubmit = \"return checkData()\">");
			response.write("<p>");
			response.write("用户 ： ");
			response.write("<input id = \"username\" name = \"username\" type = \"text\" value = " + original_1 + ">");
			response.write("<span>");
			response.write(message_1);
			response.write("</span>");
			response.write("</p>");

			response.write("<p>");
			response.write("学号 ： ");
			response.write("<input id = \"studentId\" name = \"studentId\" type = \"text\" value = " + original_2 + ">");
			response.write("<span>");
			response.write(message_2);
			response.write("</span>");
			response.write("</p>");

			response.write("<p>");
			response.write("电话 ： ");
			response.write("<input id = \"phone\" name = \"phone\" type = \"text\" value = " + original_3 + ">");
			response.write("<span>");
			response.write(message_3);
			response.write("</span>");
			response.write("</p>");

			response.write("<p>");
			response.write("邮箱 ： ");
			response.write("<input id = \"email\" name = \"email\" type = \"text\" value = " + original_4 + ">");
			response.write("<span>");
			response.write(message_4);
			response.write("</span>");
			response.write("</p>");

			response.write("<input id = \"reset\" name = \"reset\" type = \"button\" value = \"重置\">");
			response.write("<input id = \"submit\" name = \"submit\" type = \"submit\" value = \"提交\">");
			response.write("<input id = \"explain\" name = \"explain\" type = \"button\" value = \"说明\">");
		response.write("</form>")
		response.write("</div>");
	response.write("</body>");

	response.write("</html>");
	response.end();			
}

/*创建动态HTML辅助函数-->详情页面*/
function createDetailHTML(response,username,studentId,phone,email) {
	response.writeHead(200, {'Content-Type':'text/html'});
	response.write("<!DOCTYPE \"html\">");
	response.write("<html>");
	response.write("<head>");
	response.write("<meta charset=\"UTF-8\">");
	response.write("<title>用户详情</title>");
	response.write("<link rel=\"stylesheet\" type=\"text/css\" href=\"detail.css\">");
	response.write("<link rel = \"Shortcut Icon\" href = \"https://courses.cs.washington.edu/courses/cse190m/09sp/homework/1/pie_icon.gif\" type = \"image/x-icon\">");
	response.write("</head>");
	response.write("<body>");
	response.write("<div id = \"SignUp\">");
		response.write("<h2>用户详情</h2>");
		response.write("<div id = \"username\">");
		response.write("<p>用户：");
		response.write(username);
		response.write("</p>");
		response.write("</div>");

		response.write("<div id = \"studentId\">");
		response.write("<p>学号：");
		response.write(studentId);
		response.write("</p>");
		response.write("</div>");

		response.write("<div id = \"phone\">");
		response.write("<p>电话：");
		response.write(phone);
		response.write("</p>");
		response.write("</div>");

		response.write("<div id = \"email\">");
		response.write("<p>邮箱：");
		response.write(email);
		response.write("</p>");
		response.write("</div>");
	response.write("</div>");
	response.write("</body>");
	response.write("</html>");
	response.end();	
}

console.log("服务器登录");