// 1. 引用需要的模块
var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348';

// 2. 获取想要爬去的页面的html代码
http.get(url, function (res) {
	var html = '';
	res.on('data', function (data) {
		html += data;
	});
	res.on('end', function () {
		var courseData = filterChapter(html);
		printCourseInfo(courseData);
	});
}).on('error', function () {
	console.log('获取慕课网数据出错');
});

// 3. 过滤得到章节信息
	// 期望数据结构
	// [{
	// 	chapterTitle: "",
	// 	videos:[{
	// 		video:[{
	// 			title:'',
	// 			id:''
	// 		}]
	// 	}]
	// }]

function filterChapter(html) {
	var $ = cheerio.load(html);
	var chapters = $ ('.chapter');
	var courseData = [];
	chapters.each(function(item) {
		var chapter = $(this),
			chapterTitle = chapter.find('strong').text().trim(),
			videos = chapter.find('.video').children('li'),
			chapterData = {
				chapterTitle: chapterTitle,
				videos: []
			};
			videos.each(function(item) {
				var video = $(this),
					videoTitle = video.find('.J-media-item').text().trim(),
					// str.trim() 去掉字符串str前后的空格，字符串中间的空格保留，返回处理后的字符串
					videoId = video.data('media-id');
				chapterData.videos.push({
					videoTitle: videoTitle,
					videoId: videoId
				});
			});
			courseData.push(chapterData);	
	});
	return courseData;
}


// 4. 打印章节信息
function printCourseInfo(courseData) {
	courseData.forEach(function(item) {
		var chapterTitle = item.chapterTitle;
		console.log(chapterTitle + '\n');
		item.videos.forEach(function(video) {
			console.log(' 【' + video.videoId + '】 ' + video.videoTitle + '\n');
		});
	});
}
