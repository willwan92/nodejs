// 1.引入express
// 2.指定端口
// 3.实例化应用
// 4.设置应用根目录
// 5.设置模板引擎
// 6.监听端口
// 7.打印服务启用成功日志
// 8.编写路由
// 9.伪造页面数据
//
// 10. 引入path模块（便于指定请求静态资源路径）
// 11. 指定请求静态资源时使用的路径
// 12. 修改视图的默认目录（因为之前修改了视图目录views-->views>pages+includes）
// 13. 添加解析表单
//
// 14. 引入mongoose和Movie模型
// 15. 通过mongoose.connect()连接到本地数据库'mongodb: //localhost/imooc'
// 16. 编写首页、详情页、列表页与数据库的交互逻辑
// 17. 安装并引入underscore，添加后台录入页提交表单的路由
// 18. 添加更新页面的路由

var express = require('express');
var mongoose = require('mongoose');
var path = require('path');
var _ = require('underscore');
var app = express();
var bodyParser = require('body-parser');
var Movie = require('./models/movie');
var port = process.env.PORT = 3000;

mongoose.connect('mongodb://localhost/imooc');

app.set('views', './views/pages');
app.set('view engine', 'jade');
// 指定请求静态资源时使用的路径， ————dirname当前目录
app.use(express.static(path.join(__dirname, 'bower_components')));
app.use(bodyParser.urlencoded({extended: true}));
app.listen(port);

console.log('Imooc started on port ' + port);

// index page
// 首页数据--电影列表：movies; 电影数据包含字段 {title:,_id:,poster:,}
// 详情页包含数据--电影列表：movies; 电影数据包含字段 {title:,_id:,poster:,}
app.get('/', function (req, res) {
	Movie.fetch(function (err, movies) {
		if (err) {
			console.log(err);
		}

		res.render('index', {
			title: "Imooc 首页",
			movies: movies
		});
	});
});

// detail page
// 详情页数据
// 对象{title:'',movie:{ title, doctor, country, language, year, poster, flash, summary}}

app.get('/movie/:id', function (req, res) {
	var id = req.params.id;

	Movie.findById(id, function (err, movie) {
		if (err) { console.log(err); }

		res.render('detail', {
			title: movie.title,
			movie: movie
		});
	});
});

// admin page
// 后台录入页数据 movie：{电影名称，导演，国家，语种，海报地址：movie.poster,片源地址：movie.flash,上映年份，简介 }初始化值为空
app.get('/admin/movie', function (req, res) {
	res.render('admin', {
		title: "后台录入页",
		movie: {
			title: "",
			country: "",
			doctor: "",
			language: "",
			poster: "",
			flash: "",
			year: "",
			summary: ""
		}
	});
});

// admin post movie
app.post('/admin/movie/new', function (req, res) {
	var _movie = null;
	var movieObj = req.body.movie;
	var id = movieObj._id;

	if (id !== 'undefined') {
		Movie.findById('id', function (err, movie) {
			if (err) { console.log(err); }

			_movie = _.extend(movie, movieObj);
			_movie.save(function (err, movie) {
				if (err) { console.log(err); }
				res.redirect('/movie/' + movie._id);
			});
		});
	}
	else {
		_movie = new Movie({
			title: movie.title,
			country: movie.country,
			doctor: movie.doctor,
			language: movie.language,
			poster: movie.poster,
			flash: movie.flash,
			year: movie.year,
			summary: movie.summary
		});
		_movie.save(function (err, movie) {
			if (err) { console.log(err); }
			res.redirect('/movie/' + movie._id);
		});
	}
});

// admin update page
app.get('/admin/movie:id', function (req, res) {
	var id = req.params.id;

	if (id) {
		Movie.findById(id, function (err, movie) {
			res.render('admin', {
				title: "更新" + movie.title,
				movie: movie
			});
		});
	}
});

// list page
// list页数据 movies:{电影名称，导演，国家，语种，海报地址：movie.poster,片源地址：movie.flash,上映年份，简介, 录入时间:meta.createdAt; 电影id:_id; }
app.get('/admin/list', function (req, res) {
	Movie.fetch(function (err, movies) {
		if (err) {
			console.log(err);
		}

		res.render('index', {
			title: "Imooc 首页",
			movies: movies
		});
	});
});