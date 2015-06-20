var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
  res.render('salary_report', {
    title: '6月工资',
    r: pickUser(req.query.userID)
  })
});

function pickUser(name) {

  return name == 'zhangjie' ? {
    name: '张洁',
    f1: 2500,
    f2: 650,
    f3: 1350,
    f4: '100%',
    f5: 522,
    f6: 4500,
    f7: 4500,
    f8: 0,
    f9: 0,
    f10: 0,
    f11: 0,
    f12: 4500.00,
    f13: 0.00,
    f14: 4500.00,
    f15: 385.54,
    f16: 0.00,
    f17: 0,
    f18: 0,
    f19: 0,
    f20: 0,
    f21: '新产品事业部-研发',
    f22: 0,
    f23: '涨薪500',
    f24: '无'
  } : {
    name: '张威',
    f1: 22500,
    f2: 1650,
    f3: 12350,
    f4: '100%',
    f5: '135000%',
    f6: 42500,
    f7: 43500,
    f8: 0,
    f9: 4,
    f10: 0,
    f11: 0,
    f12: 43500.00,
    f13: 0.00,
    f14: 43500.00,
    f15: 3385.54,
    f16: 0.00,
    f17: 0,
    f18: 1,
    f19: 456456,
    f20: 0,
    f21: '新产品事业部-大老板',
    f22: 0,
    f23: '扣了不少',
    f24: '无'
  }
}

module.exports = router;