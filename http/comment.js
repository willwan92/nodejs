// 1. 引用模块
var http = require('http');
var querystring = require('querystring');

// 2. 设置上传数据
var postData = querystring.stringify({
	'content': '感觉还不错',
	'mid': 1084
});
 
// 3. 请求配置
var options = {
	'hostname': 'www.imooc.com',
	'port': 80,
	'path': '/course/docomment',
	'method': 'post',
	'headers': {
		'Accept':'application/json, text/javascript, */*; q=0.01',
		'Accept-Encoding':'gzip, deflate',
		'Accept-Language':'zh-CN,zh;q=0.8',
		'Connection':'keep-alive',
		'Content-Length':postData.length,
		'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
		'Cookie':'imooc_uuid=beef9d8a-c20d-4c39-b989-72fa8a4cc6ad; imooc_isnew_ct=1489920207; UM_distinctid=15c9622e313a8-0594fc3ceb824d-5393662-144000-15c9622e315668; CNZZDATA1261110065=831450276-1497163646-https%253A%252F%252Fwww.baidu.com%252F%7C1497163646; PHPSESSID=03i3raisq35h64qb8s4h92i1j5; loginstate=1; apsid=c0ZGE2ZjJiYTliMjYzYzA2ZTk1ODU3ZjVjZmMyN2IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANTU4MDIyNQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAB3aWxzb24zY3lAMTYzLmNvbQAAAAAAAAAAAAAAAAAAAGMxZDg2OGYyYzQ4NzNkMTA3OWY5YWIyYWI0NzY2MDljBvFqWQbxalk%3DZT; last_login_username=wilson3cy%40163.com; IMCDNS=0; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1499508635,1499509162,1499692148,1500174177; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1500211002; imooc_isnew=2; cvde=596ad758bf7ca-128',
		'Host':'www.imooc.com',
		'Origin':'http://www.imooc.com',
		'Referer':'http://www.imooc.com/video/1084',
		'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/59.0.3071.115 Safari/537.36',
		'X-Requested-With':'XMLHttpRequest'
	}
};

// 4. 发送请求
var req = http.request(options, function (res) {
	console.log('status: ' + res.statusCode);
	console.log('headers: ' + JSON.stringify(res.headers));

	res.on('data', function(chunk) {
		console.log(Buffer.isBuffer(chunk));
		console.log(typeof chunk);
	});

	res.on('end', function () {
		console.log('评论成功');
	});

});

// 5. 请求错误函数
req.on('error', function(e) {
	console.log('erron: ' + e.message);
});

// 6. 写入上传数据
req.write(postData);
// 7. 结束请求
req.end(); 
