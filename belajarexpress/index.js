// Task 1
/*
const express = require('express');
const app = express();
const port = process.argv[2];

app.get('/home', function(req, res) {
	res.end('Hello World!');
})

app.listen(port);
*/
// Task 2
/*
const express = require('express');
const app = express();
const port = process.argv[2];
const filename = process.argv[3];

app.use(express.static('public'));

app.listen(port);
*/
// Task 3
/*
const express = require('express');
const app = express();
const port = process.argv[2];
const viewsPath = process.argv[3];
const myDate = {
	myDate: new Date().toDateString()
};

app.set('views', viewsPath);
app.set('view engine', 'pug');

app.get('/home', function(req, res) {
	res.render('index', myDate);
})

app.listen(port);
*/
// Task 4
/*
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.argv[2];

app.use(bodyParser.urlencoded({extended:false}));
app.set('views', 'view');
app.set('view engine', 'pug');

app.get('/form', function(req, res) {
	res.render('index');
})

app.post('/form', function(req, res) {
	res.end(req.body.str.split('')
						.reverse()
						.join(''));
})

app.listen(port);
//*/
// Task 5
/*
const express = require('express');
const stylus = require('stylus');
const app = express();
const port = process.argv[2];
const folderName = process.argv[3];

app.use(stylus.middleware(folderName));
app.use(express.static(folderName));

app.listen(port);
*/
// Task 6
/*
const express = require('express');
const crypto = require('crypto');
const app = express();
const port = process.argv[2];
const folderName = process.argv[3];

app.put('/message/:id', function(req, res) {
	res.end(crypto.createHash('sha1')
					.update(new Date().toDateString() + req.params.id)
					.digest('hex'));
})

app.listen(port);
*/

// Task 7
/*
const express = require('express');
const app = express();
const port = process.argv[2];

app.get('/search', function(req, res) {
	res.set({
		'content-type':'application/json'
	})
	res.end(JSON.stringify(req.query));
})

app.listen(port);
*/
// Task 8

const express = require('express');
const app = express();
const port = process.argv[2];
const fs = require('fs');

app.get('/books',function(req, res) {
	res.set({
		'content-type':'application/json'
	})

	fs.readFile(process.argv[3], function(err, data) {
		if(err) {
			console.log('error',err);
			return;
		} 

		res.json(JSON.parse(data.toString()));
	});


})

app.listen(port);


