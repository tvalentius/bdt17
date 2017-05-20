
/////////// STEP 1 ///////////////////
/* 

console.log('HELLO WORLD');

*/


//////////// STEP 2 //////////////////
/*
var sum = 0;
var count = 0;

process.argv.forEach(function(item) {
	if(count > 1) {
		sum += parseInt(item);
	}

	count++;
});

console.log(sum);
*/
//////////// STEP 3 /////////////////
/*
var fs = require('fs');

var jumlahLine = fs.readFileSync(process.argv[2])
					.toString()
					.split('\n')
					.length-1;


console.log(jumlahLine);
*/

//////////// STEP 4 /////////////////
/*
var fs = require('fs');
var jumlahLine;
fs.readFile(process.argv[2], function(err, data) {
	if(err) {
		console.log('error',err);
		return;
	} 

	jumlahLine = data.toString().split('\n').length-1;

	console.log(jumlahLine);

});
*/
//////////// STEP 5 /////////////////
/*
var fs = require('fs');
var path = require('path');

fs.readdir(process.argv[2], function(err, list) {

	var ext = '.'+process.argv[3];

	for (var i = 0; i < list.length; i++) {
		if(ext == path.extname(list[i])) {
			console.log(list[i]);
		} else {
			continue;
		}
	}
});
*/

///////////// STEP 6 ///////////////
/*
var modul = require('./modul');

modul(process.argv[2], process.argv[3], function(err,data) {
	data.forEach(function(item) {
		console.log(item);
	});
});
*/
///////////// STEP 7 ///////////////
/*
var http = require('http');

http.get(process.argv[2],function(res) {
	res.setEncoding('utf8');
	res.on('data',function(chunk) {
		console.log(chunk);
	});
	res.on('error',function(err) {
		console.log(err);
	})

});
*/

///////////// STEP 8 ///////////////

/*
var http = require('http');

http.get(process.argv[2],function(res) {

	var rawData = '';

	

	res.on('error',function(err) {
		console.log(err);
	});

	res.on('end',function() {
		console.log(rawData.length);
		console.log(rawData);
	});

	res.on('data',function(chunk) {
		//console.log(chunk);
		rawData += chunk;
	});

	res.setEncoding('utf8');

});
*/

///////////// STEP 9 ///////////////
/*
var http = require('http');

http.get(process.argv[2],function(res) {

	var rawData = '';
	

	res.on('error',function(err) {
		console.log(err);
	});

	res.on('end',function() {
		console.log(rawData);
		http.get(process.argv[3], function(res) {
			var rawData = '';
			res.on('data',function(chunk) {
				rawData += chunk;
			});
			res.on('end',function() {
				console.log(rawData);
				http.get(process.argv[4], function(res) {
					var rawData = '';
					res.on('data',function(chunk) {
						rawData += chunk;
					});
					res.on('end',function() {
						console.log(rawData);
						
					});
				});
			});
		});
	});

	res.on('data',function(chunk) {
		//console.log(chunk);
		rawData += chunk;
	});

	res.setEncoding('utf8');

});
*/

///////////// STEP 10 ///////////////
/*
var net = require('net');

net.createServer(function(socket) {
		var date = new Date();
		//"YYYY-MM-DD hh:mm"  
		var month = date.getMonth()+1;
		month = (month > 10) ? month:'0'+month;
		var minute = date.getMinutes();
		minute = (minute > 10) ? minute:'0'+minute;

		socket.write(date.getFullYear()+'-'+month+'-'+date.getDate()+' '+date.getHours()+':'+minute+"\n");
		socket.end();
	}).listen(process.argv[2]);
*/

///////////// STEP 11 ///////////////
/*
var http = require('http');
var fs = require('fs');

http.createServer(function(req,res) {
	var stream = fs.createReadStream(process.argv[3]);
	stream.on('open',function() {
		stream.pipe(res);
	});
	stream.on('close',function() {
		res.end();
	});

}).listen(process.argv[2]);
*/

///////////// STEP 12 ///////////////
/*
var http = require('http');
var map = require('through2-map');

http.createServer(function(req,res) {

	if(req.method == 'POST') {
		var _map = map(function(chunk) {
			return chunk.toString().toUpperCase();
		});
		req.pipe(_map).pipe(res);
	}
}).listen(process.argv[2]);
*/

///////////// STEP 13 ///////////////
var http = require('http');
var url = require('url');

http.createServer(function(req, res) {
	var parseUrl = url.parse(req.url,true);
	var date = new Date(parseUrl.query.iso);
	//console.log(parseUrl);
	switch(parseUrl.pathname) {
		case '/api/parsetime':
			res.writeHead(200,{
				"Content-Type":"application/json",
			});
			res.end(JSON.stringify({
				"hour":date.getHours(),
				"minute":date.getMinutes(),
				"second":date.getSeconds()
			}));
			break;
		case '/api/unixtime':
			res.writeHead(200,{
				"Content-Type":"application/json",
			});
			res.end(JSON.stringify({
				"unixtime":date.getTime()
			}));
			break;
	}

}).listen(process.argv[2]);




