var express = require('express');
var router = express.Router();

var WXBizMsgCrypt = require('wechat-crypto');

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

router.post('/', function(req, res){
  console.log(req.body)
  console.log(req.query)
  var msg_signature = req.query.msg_signature;
  var timestamp = req.query.timestamp;
  var nonce = req.query.nonce;
  //var cryptor = new WXBizMsgCrypt(config.token, config.encodingAESKey, config.corpId)
  var wrapTpl = 'haha';
  //var encrypted = cryptor.encrypt(wrapTpl);
  res.send(wrapTpl);
});

module.exports = router;
