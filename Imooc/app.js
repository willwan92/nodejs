// 1.引入express
// 2.指定端口
// 3.实例化应用
// 4.设置应用根目录
// 5.设置模板引擎
// 6.监听端口
// 7.打印服务启用成功日志
// 8.编写路由

// 9伪造页面数据
// 首页数据--电影列表：movies; 电影数据包含字段 {title:,_id:,poster:,}
// 详情页包含数据--电影列表：movies; 电影数据包含字段 {title:,_id:,poster:,}
var express = require('express');
var app = express();
var port = process.env.PORT = 3000;

app.set('views', './views');
app.set('view engine', 'jade');
app.listen(port);

console.log('Imooc started on port ' + port);

// index page
app.get('/', function (req, res) {
	res.render('index', {
		title: "Imooc 首页",
		movies: [{
			title: "复仇者联盟3：无限战争",

		}]
	})
});

// detail page
app.get('/movie/:id', function (req, res) {
	res.render('detail', {
		title: "详情页"
	})
});

// admin page
app.get('/admin/movie', function (req, res) {
	res.render('admin', {
		title: "后台录入页"
	})
})

// list page
app.get('/admin/list', function (req, res) {
	res.render('list', {
		title:"列表页"
	})
})