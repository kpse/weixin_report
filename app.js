var express = require('express');
var wechat = require('wechat-enterprise');
var app = express();
app.use(connect.query());

var config = {
  token: 'LQbOWl94FP8E',
  encodingAESKey: '878BkiLfb2H3nAV28TBYOLykt5EnVrec2PujHElTyWR',
  corpId: 'wx0328f4ebaec4d5d4'
};

app.use('/corp', wechat(config, function (req, res, next) {
  res.writeHead(200);
  res.end('hello node api');
}));