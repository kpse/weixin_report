var express = require('express');
var router = express.Router();

var WXBizMsgCrypt = require('wechat-crypto');
var wechat = require('wechat-enterprise');

var config = {
  token: 'LQbOWl94FP8E',
  encodingAESKey: '878BkiLfb2H3nAV28TBYOLykt5EnVrec2PujHElTyWR',
  corpId: 'wx0328f4ebaec4d5d4'
};

router.get('/', function(req, res){
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
  // 回复屌丝(普通回复)
  if (message.FromUserName === 'diaosi') {
    res.reply('hdehe');
  } else if (message.FromUserName === 'hehe') {
    res.reply({
      title: "来段音乐吧",
      description: "一无所有",
      musicUrl: "http://mp3.com/xx.mp3",
      hqMusicUrl: "http://mp3.com/xx.mp3"
    });
  } else {
    // 回复高富帅(图文回复)
    res.reply([
      {
        title: '你来我家接我吧',
        description: '这是女神与高富帅之间的对话',
        picurl: 'http://nodeapi.cloudfoundry.com/qrcode.jpg',
        url: 'http://nodeapi.cloudfoundry.com/'
      }
    ]);
  }
}).location(function (message, req, res, next) {
  res.reply('location');
}).image(function (message, req, res, next) {
  res.reply('image');
}).voice(function (message, req, res, next) {
  res.reply('voice');
}).link(function (message, req, res, next) {
  res.reply('link');
}).event(function (message, req, res, next) {
  res.reply('event');
})));

module.exports = router;
