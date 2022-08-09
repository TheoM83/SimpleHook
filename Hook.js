const http = require("http");
const FormData = require('form-data');

//Parameters
const host = '192.168.1.28';
const port = 4444;

const requestListener = function (req, res) {

	//Client
	res.writeHead(200);
	res.end("H00K3D!");

	//Server
	let date_ob = new Date();
	let hours = date_ob.getHours();
	let minutes = date_ob.getMinutes();

	process.stdout.write('\t' + '--- NEW REQUEST --- (' + `${hours}h${minutes}` + ')'+ '\n')
	
	process.stdout.write(req.method + ' from ' + req.socket.remoteAddress + '\n');
	process.stdout.write(`http://${host}:${port}`+ req.url + '\n\n')

	let params = req.url.split('?');
	params = params[1]
	if (params !== undefined) {
		process.stdout.write('parameters : ' + '\n');
		params = params.split('&')
		params.forEach(element => {
			sub = element.split('=')
			process.stdout.write('  ' + sub[0] + ' = ' + sub[1] + '\n');
		});
	}
	process.stdout.write('\n\n')
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
	process.stdout.write('\n' + `WebHook at http://${host}:${port}` + '\n\n');
});
