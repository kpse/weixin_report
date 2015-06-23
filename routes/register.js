var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('register', {
    title: req.query.userID + '查询密码设置',
    name: req.query.userID
  })
});

router.post('/', function (req, res, next) {
  var username = req.body.username
  res.render('register-success', {
    name: username
  })
});

module.exports = router;
