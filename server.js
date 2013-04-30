var static = require('node-static');
var file = new static.Server('./dist');
var port = process.env.PORT || 5000;
require('http').createServer(function(request, response) {
	file.serve(request, response, function(err, res) {
		if (err) { // An error as occured
			console.error("> Error serving " + request.url + " - " + err.message);
			response.writeHead(err.status, err.headers);
			response.end();
		} else { // The file was served successfully
			console.log("> " + request.url + " - " + res.message);
		}
	});
}).listen(port);

console.log("> node-static is listening on http://127.0.0.1:" + port);