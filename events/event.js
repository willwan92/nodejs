
// 实例化对象
var events = require('events');
var EventEmitter = events.EventEmitter;
var life = new EventEmitter();


// 设置事件监听数最大值
life.setMaxListeners(12);

// add eventListener
life.on('comfort', function(who) {
	console.log('给' + who + '倒水');
});
life.on('comfort', function(who) {
	console.log('给' + who + '更衣');
});
life.on('comfort', function(who) {
	console.log('给' + who + '揉肩');
});
life.on('comfort', function(who) {
	console.log('给' + who + '捶腿');
});
life.on('comfort', function(who) {
	console.log('给' + who + '做饭');
});
life.on('comfort', function(who) {
	console.log('给' + who + '泡茶');
});
life.on('comfort', function(who) {
	console.log('给' + who + '洗脚');
});

life.on('comfort', function(who) {
	console.log('给' + who + '。。9');
});
life.on('comfort', function(who) {
	console.log('给' + who + '。。。');
});
life.on('comfort', function(who) {
	console.log('给' + who + '倒水');
});

life.on('spoil', function(who) {
	console.log('给 ' + who + ' 买衣衣');	
});

// 添加事件监听
life.on('comfort', water);
function water(who) {
	console.log('给' + who + '倒水');
}
life.on('comfort', function(who) {
	console.log('给' + who + '按摩');
});

// 触发事件，返回是否添加了事件监听（boolean）
var hasComfortListener = life.emit('comfort', '朕');
// 移除事件监听
life.removeListener('comfort',water); // 移除单个事件
life.removeAllListeners('comfort');   // 移除一类事件

// 事件监听的个数
console.log(EventEmitter.listenerCount(life, 'spoil'));
console.log(life.listeners('comfort').length);


var hasSpoilListener = life.emit('spoil', '妹子');
var hasPlayedListener = life.emit('played', '妹子和朕');

// console.log(hasComfortListener);
// console.log(hasSpoilListener);
// console.log(hasPlayedListener);
