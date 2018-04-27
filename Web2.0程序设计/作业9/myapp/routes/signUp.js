var express = require('express');
var router = express.Router();
var Promise = require("bluebird");
var bcrypt = require("bcrypt");
var debug = require("debug")("myapp:index");
var querystring = require("querystring");
var NowUsers;

function passwordEncryption(str) {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  var hash = bcrypt.hashSync(str, salt);
  return hash;
}

function checkNotLogin(req, res, next) {
  if (!req.session.user)
    return res.redirect('/');
  next();
}

module.exports = function(db) {
  var users = db.collection("users");
  router.get('/',function(req,res,next) {
    /*session中存在该User（即有用户登录），自动跳转到该用户的页面，
      否则自动跳转到登录界面*/
    if(req.session.user) {
      if(req.query.username && req.query.username !== req.session.user.username) {
        req.session.alert = true;
      }
      res.redirect("/detail");
    } else {
      res.redirect("/signin");
    }
  })


  /*直接输入signin则跳转到登录界面*/
  router.get('/signin', function(req, res ,next) {
    res.render('signin', { title: "登录" , user: {}});
  });

  function findUser(username, password, db){
    var users = db.collection('users');
    return users.findOne({username: username}).then(function(user){
      if(bcrypt.compareSync(password, user.password) == true){
        return user;
      }
      else{
        return Promise.reject("用户名或密码错误");
      }
    });
  }

  router.post('/signin', function(req, res, next) {
    var user = req.body;
    NowUsers = req.body.username;
    if(req.session.user) { //先前已经登录了
      if(req.query.username && req.query.username !== req.session.user.username) {
        req.session.alert = true;
      }
      res.redirect("/detail");
    } 
    else {
        findUser(user.username,user.password,db).then(function(user) {    
            console.log("用户登录成功");
            req.session.user = user;
            res.redirect("/detail");  
        }).catch(function(err) {
            res.render("signin", { title: '详情', error: "用户名或密码错误"});
        });  
    }
  });

  router.get('/regist', function(req, res, next) {
    if(req.session.user) {
      res.redirect('/detail');
    } else {
      res.render("signUp");
    }
  });

  router.post('/regist', function(req, res, next) {
    var user = req.body;
    var isMessageValid = true;
    var error_username = "";
    var error_studentId = "";
    var error_phone = "";
    var error_email = "";

    return users.findOne({"username" : user.username}).then(function(user) {
      if(user) {
        error_username = "用户已注册";
        isMessageValid = false;     
      }
    }).then(function() {
      return users.findOne({"studentId" : user.studentId});
    }).then(function(user) {
      if(user) {
        error_studentId = "学号已注册";
        isMessageValid = false;        
      }
    }).then(function() {
      return users.findOne({"phone" : user.phone});
    }).then(function(user) {
      if(user) {
        error_phone = "电话已注册";
        isMessageValid = false;  
      }
    }).then(function() {
      return users.findOne({"email" : user.email});
    }).then(function(user) {
      if(user) {
        error_email = "邮箱已注册";
        isMessageValid = false;         
      }
    }).then(function() {
      if(isMessageValid) {
        NowUsers = user.username;
        user.password = passwordEncryption(user.password);
        req.session.user = user;
        users.insert(user);
        res.redirect('/detail');
      } else {
        res.render('signUp', { title: '注册', error_username, error_studentId, error_phone, error_email});
      }   
    });
  });

  router.get("/logout", function(req, res) {
    req.session.user = null;
    res.redirect('/signin');
  });


  router.all('*',function(req,res,next) {
    req.session.user ? next() : res.redirect("/signin");
  });

  router.get('/detail', function(req, res, next) {
    var str = "";
    if(req.session.user && req.session.user.username != NowUsers) {
      str = "你只能看到自己的信息";
    } else {
      str = "";
    }
    res.render('detail', {title: '详情', user: req.session.user, warning: str});
  });

  /* GET users listing. */
  router.get('/', checkNotLogin);
  router.get('/', function(req, res, next) {
    if (req.session.alert) {
      req.session.alert = false;
      res.render('detail', { title: '详情', warning: "你只能看到自己的信息"});
    } else {
      res.render('detail', { title: '详情', warning : "你只能看到自己的信息"});
    }
  });


  return router;
}