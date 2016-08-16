'use strict';
var express = require('express');
var request = require('request');

var app = express();

app.get('/getBingBGImg', (req, res, next) => {
	var w = req.query.w;
	request('http://cn.bing.com/HPImageArchive.aspx?format=js&idx=0&n=1', (err, response, body) => {
		var obody, imgUrl;
		obody = JSON.parse(body);
		imgUrl = obody.images[0].url;
		if(+w != 1920){
			imgUrl = imgUrl.replace('1920x1080',getImgSize(w));
		}
		request.get(imgUrl).pipe(res)
	})
});

var getImgSize = w =>{
	switch(+w){
		case 480:
			return "480x800";
			break;
		case 1024:
			return "1024x768";
			break;
		case 1366:
			return "1366x768";
			break;
		default: 
			return "1366x768";
			break;
	}
}

var server = app.listen(3000, () => {
  var host = server.address().address;
  var port = server.address().port;
  console.log('sys listening at http://%s:%s', host, port);
});

