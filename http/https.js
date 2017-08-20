var https = require('https');
var fs = require('fs');

var options = {
	key: fs.readFileSync('ssl_key.pem'),
	cert: fs.readFileSync('ssl_cert.pem')
};

https
	.createServer(options, function (req, res) {
		res.writeHead(200);
		res.end('hello world!');
	})
	.listen(8080);