// 引入mongoose
// 通过mongoose.Schema({})实例化一个电影模式movieSchema，传入一个json对象用来定义跟电影有关的字段的数据类型
// {}包含字段：docton, title, language, country, summary, flash, poster, year, meat: {creatAt:{type: Date, default: Date.now()}, updateAt:{}}
// 通过movieSchema.pre("save", function)为模式添加保存数据之前方法，用来记录新增数据或修改数据的时间，并执行next()保存数据
// 为movieSchema添加静态方法statics = {fetch:查询所有数据，按更新时间排序并执行回调函数，findById:通过id查询单条数据，并执行回调函数}
// 暴露出movieSchema


var mongoose = require("mongoose");

var movieSchema = mongoose.Schema({
	doctor: string,
	title: string,
	language: string,
	country: string,
	summary: string,
	flash: string,
	poster: string,
	year: number,
	meta: {
		createAt: {
			type: Date,
			default: Date.now()
		},
		updateAt: {
			type: Date,
			default: Date.now()
		}
	}
});

movieSchema.pre("save", function (next) {
	if (this.isNew) {
		this.meta.createAt = this.meta.updateAt = Date.now();
	} else {
		this.meta.updateAt = Date.now();
	}
	next();
});

movie.statics = {
	fetch: function (cb) {
		return this
			.find({})
			.sort(this.meta.updateAt)
			exec(cb);
	},
	findById: function (id, cb) {
		return this
			.find({_id: id})
			exec(cb);
	}
}


module.exports = movieSchema;