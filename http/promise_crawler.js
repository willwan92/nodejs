// 1. 引入所需模块
var http = require('http');
var cheerio = require('cheerio');
var promise = require('Bluebird');
var fetchPageArr = [];
var courseDataArr = [];
var badeUrl = 'http://www.imooc.com/learn/';
var videosId = [728, 637, 348, 259, 197, 134, 75];
videosId.forEach(function(id){
	fetchPageArr.push(getPageAsync(badeUrl + id));
});
Promise
	.all(fetchPageArr)
	.then(function(pages){
		pages.forEach(function(page){
			courseDataArr.push(filterChapter(page));
		});
		courseDataArr.forEach(function(courseData){
			printCourseInfo(courseData);
		});
	});
// 2. 获取想要爬去的页面的html代码
function getPageAsync(url) {
		return new Promise(function(resolve, reject){
			var html = '';
			http.get(url, function (res) {
				res.on('data', function (data) {
					console.log('正在加载 ' + url);
					html += data;
				});
				res.on('end', function() {
					resolve(html);
					// var courseData = filterChapter(html);
					// printCourseInfo(courseData);
				});
			}).on('error', function(e) {
				reject(e);
				console.log('获取课程出错');
			});
		});
	// printCourseInfo(courseDataArr); //printCourseInfo会在请求完成之前执行，错误
}
// 3. 过滤章节信息
// 期望的得到的数据结构
// var courseData = {
// 	title: title,
// 	number: number,
// 	chapters: [{
// 		chapterTitle: "",
// 		videos:[{
// 			video:[{
// 				title:'',
// 				id:''
// 			}]
// 		}]
// 	}]
// };

function filterChapter(html) {
	var $ = cheerio.load(html);
	var courseData = {
		title: "",
		number: "",
		chapters: []
	};
	courseData.title = $('.hd h2').text();
	courseData.number = $('.statics').find('.js-learn-num').text();
	var chapters = $ ('.chapter');
	chapters.each(function(item) {
		var chapterData = {
			chapterTitle: "",
			videos:[]
		};
		var chapter = $(this);
		chapterData.chapterTitle = chapter.find('strong').text().trim().split('\n')[0];
		var videos = chapter.find('.video').children('li');
		videos.each(function(item) {
			var video = $(this),
				videoTitle = video.find('.J-media-item').text().trim().split('\n')[0],
				// str.trim() 去掉字符串str前后的空格，字符串中间的空格保留，返回处理后的字符串
				videoId = video.data('media-id');
			chapterData.videos.push({
				videoTitle: videoTitle,
				videoId: videoId
			});
		});
		courseData.chapters.push(chapterData);	
	});
	return courseData;
}

// 4. 打印章节信息
// function printCourseInfo(courseDataArr) {
// 	console.log(courseDataArr);
// 	courseDataArr.sort(function(a, b){
// 		return a < b;
// 	});
// 	courseDataArr.forEach(function (courseData) {
// 		console.log(courseData.number + ' 人学过 ' + courseData.title + '\n');
// 		console.log('### ' + courseData.title + '\n');
// 		courseData.chapters.forEach(function(chapter) {
// 			var chapterTitle = chapter.chapterTitle;
// 			console.log(chapterTitle + '\n');
// 			chapter.videos.forEach(function(video) {
// 				console.log(' 【' + video.videoId + '】 ' + video.videoTitle + '\n');
// 			});
// 		});
// 	});
// }
function printCourseInfo(courseData) {
	console.log('### ' + courseData.title + '\n');
	courseData.chapters.forEach(function(chapter) {
		var chapterTitle = chapter.chapterTitle;
		console.log(chapterTitle + '\n');
		chapter.videos.forEach(function(video) {
			console.log(' 【' + video.videoId + '】 ' + video.videoTitle + '\n');
		});
	});
}