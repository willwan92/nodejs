// 引入mongoose和movieSchema
// 通过mongoose.model()编译生成Movie这个模型构造函数
// 导出这个模型


var mongoose = require('mongoose');
var movieSchema = require('../schemas/movie.js');
var Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie; 