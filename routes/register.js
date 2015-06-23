var express = require('express');
var loki = require('lokijs');
var router = express.Router();

var db = new loki('salary.db');
var users = {}
db.loadDatabase({}, function () {
  users = db.getCollection('users');
});


router.get('/', function (req, res, next) {
  res.render('register', {
    title: req.query.userID + '查询密码设置',
    name: req.query.userID
  })
});

router.post('/', function (req, res, next) {
  var username = req.body.username;
  var password = req.body.password;
  var template  = users.findOne({'id': 'template'}).detail;
  template.name = username;
  db.loadDatabase({}, function () {
    users = db.getCollection('users')
    users.insert({id: username, detail: template, password: password});
    console.log(users);
    db.saveDatabase();
  });

  res.render('register-success', {
    name: username
  })
});

module.exports = router;
