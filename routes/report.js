var express = require('express');
var loki = require('lokijs');
var router = express.Router();

var db = new loki('salary.db');
var users = {}
db.loadDatabase({}, function () {
  users = db.getCollection('users')
});

router.get('/login', function (req, res, next) {
  var id = req.query.userID;
  pickUser(id, function (u) {
    if (!u) return res.redirect('/register?userID=' + id);
    var err = req.query.err;
    res.render('login', {
      title: id + '登陆',
      c: {name: id},
      error: {err: err, name: '用户密码错，请确认注册时设置的查询密码'}
    })
  })
});

router.post('/login', function (req, res, next) {
  var postData = req.body;
  pickUser(postData.username, function (u) {
    console.log(u);
    if (!u) return res.send(404, 'no such user');
    var p = u.password;
    console.log(postData);
    if (postData.password == p) {
      res.redirect('/report?userID=' + postData.username + '&month=' + (postData.month ? postData.month : '201506'))
    } else {
      res.redirect('/report/login?userID=' + postData.username + '&err=1')
    }
  });
});

router.get('/', function (req, res, next) {
  pickUser(req.query.userID, function (u) {
    if (!u) {
      return res.send(404, 'no such user');
    }
    res.render('salary_report', {
      title: req.query.month + '工资条',
      r: u.detail,
      month: req.query.month
    })
  });

});

function pickUser(name, callback) {
  db.loadDatabase({}, function () {
    users = db.getCollection('users');
    callback(users.findOne({'id': name}))
  });
}

module.exports = router;
