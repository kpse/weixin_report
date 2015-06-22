var express = require('express');
var router = express.Router();

var WXBizMsgCrypt = require('wechat-crypto');
var wechat = require('wechat-enterprise');

var config = {
  token: 'LQbOWl94FP8E',
  encodingAESKey: '878BkiLfb2H3nAV28TBYOLykt5EnVrec2PujHElTyWR',
  corpId: 'wx0328f4ebaec4d5d4'
};

router.get('/', function (req, res) {
  var msg_signature = req.query.msg_signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  var echostr = req.query.echostr;
  var cryptor = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId)
  var s = cryptor.decrypt(echostr);
  res.send(s.message);
});

//router.post('/', function(req, res){
//  console.log(req.body)
//  console.log(req.query)
//  var msg_signature = req.query.msg_signature;
//  var timestamp = req.query.timestamp;
//  var nonce = req.query.nonce;
//  var cryptor = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId)
//  var wrapTpl = 'haha';
//  var msg = cryptor.getSignature(timestamp, nonce, req.body);
//  res.send(msg);
//});
router.use(express.query());
router.use('/', wechat(config, wechat.text(function (message, req, res, next) {
  // 微信输入信息都在message上
  console.log('zhangjie reply');
  res.reply('欢迎使用，暂时只有查询工资条功能');
}).location(function (message, req, res, next) {
  res.reply('location');
}).image(function (message, req, res, next) {
  res.reply('image');
}).voice(function (message, req, res, next) {
  res.reply('voice');
}).link(function (message, req, res, next) {
  res.reply('link');
}).event(function (message, req, res, next) {
  console.log('event reply');
  res.reply([
    {
      title: '工资查询',
      description: '王伟的6月工资条',
      picurl: 'http://img1.cache.netease.com/catchpic/4/4F/4F678FDC36A992A07952027E570159B6.jpg',
      url: 'http://mm-query.herokuapp.com/report/login?userID=' + message.FromUserName
    }
  ]);
})));

module.exports = router;
