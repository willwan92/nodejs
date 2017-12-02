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

var express = require('express');
var path = require('path');
var app = express();
var bodyParser = require('body-parser');
var port = process.env.PORT = 3000;


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
	res.render('index', {
		title: "Imooc 首页",
		movies: [{
			title: "天才眼镜狗",
			_id:1,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:2,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:3,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:4,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:5,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:6,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:7,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:8,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		},{
			title: "天才眼镜狗",
			_id:9,
			poster:"http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6"
		}]
	})
});

// detail page
// 详情页数据
// 对象{title:'',movie:{ title, doctor, country, language, year, poster, flash, summary}}

app.get('/movie/:id', function (req, res) {
	res.render('detail', {
		title: "电影详情页",
		movie: {
			title: "天才眼睛狗",
			doctor: "罗伯·明可夫",
			country: "美国",
			language: "英语",
			year: "2014年3月",
			poster: "http://r1.ykimg.com/05160000599A8D57ADBC0902FF0590C6",
			flash: "http://v.youku.com/ca506e3f-bf94-4975-9bb5-4f13427a4a37",
			summary: "皮博迪（泰·布利尔 Ty Burrell 配音）是一条与众不同的小狗，它拥有绝伦无比的高智商，因此注定拥有迥异于同类的“狗生”。它持有哈佛学位，成功开发了新能源，圆满解决地缘政治，还创立了属于自己的公司。皮博迪偶然机缘下收养了和它有着类似经历的人类小孤儿舍曼（麦克斯·查尔斯 Max Charles 配音），它如同慈父一般悉心教育着他的儿子，并利用自己开发的时光机带舍曼回到未来每一个重要时刻，亲身经历书本上枯燥的历史事件。转眼舍曼到了上学的年龄，他丰富的历史知识得到老师表扬，却也引来高傲的小姑娘佩妮·彼得森（阿芮尔·温特 Ariel Winter 配音）的嫉妒和欺负。舍曼和佩妮的冲突使皮博迪陷入前所未有的艰难境地，为了保住对舍曼的抚养权，它想尽办法取悦佩妮的父母和相关机构负责人。 "
		}
	})
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
	})
})

// list page
// list页数据 movies:{电影名称，导演，国家，语种，海报地址：movie.poster,片源地址：movie.flash,上映年份，简介, 录入时间:meta.createdAt; 电影id:_id; }
app.get('/admin/list', function (req, res) {
	res.render('list', {
		title:"列表页",
		movies: [{
			title: "天才眼睛狗",
			_id: "1",
			doctor: "罗伯·明可夫",
			country: "美国",
			language: "英语",
			year: "2014年3月",
			flash: "http://v.youku.com/ca506e3f-bf94-4975-9bb5-4f13427a4a37",
			summary: "皮博迪（泰·布利尔 Ty Burrell 配音）是一条与众不同的小狗，它拥有绝伦无比的高智商，因此注定拥有迥异于同类的“狗生”。它持有哈佛学位，成功开发了新能源，圆满解决地缘政治，还创立了属于自己的公司。皮博迪偶然机缘下收养了和它有着类似经历的人类小孤儿舍曼（麦克斯·查尔斯 Max Charles 配音），它如同慈父一般悉心教育着他的儿子，并利用自己开发的时光机带舍曼回到未来每一个重要时刻，亲身经历书本上枯燥的历史事件。转眼舍曼到了上学的年龄，他丰富的历史知识得到老师表扬，却也引来高傲的小姑娘佩妮·彼得森（阿芮尔·温特 Ariel Winter 配音）的嫉妒和欺负。舍曼和佩妮的冲突使皮博迪陷入前所未有的艰难境地，为了保住对舍曼的抚养权，它想尽办法取悦佩妮的父母和相关机构负责人。 "
		}]
	})
})