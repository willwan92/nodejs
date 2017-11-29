var fs = require('fs');

fs.readFile('logo.png', function(err, orign_buffer){
	console.log(Buffer.isBuffer(orign_buffer));

	fs.writeFile('logo_buffer.png', orign_buffer, function(err){
		if(err) console.log(err);
	});

	var base64Img = orign_buffer.toString('base64');
	console.log(base64Img);

	var base64_buffer = Buffer.from(base64Img, 'base64');
	console.log(Buffer.compare(base64_buffer, orign_buffer));

	fs.writeFile('logo_base64.png', base64_buffer, function(err){
		if (err) console.log(err);
	});
});