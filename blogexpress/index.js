const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 1337;
const fs = require('fs');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:false}));

app.get('/',function(req,res) {
	fs.readFile('blog.json',function(err, data) {
		if(err) {
			res.sendStatus(500);
		} else {
			const jsonData = JSON.parse(data.toString());
			res.render('index',{blogs:jsonData.blogs});
		}
	});
	//res.render('index');
});

app.get('/post/:id',function(req,res) {
	fs.readFile('blog.json',function(err, data) {
		if(err) {
			res.sendStatus(500);
		} else {

			const jsonData = JSON.parse(data.toString());
			jsonData.blogs.forEach(function(blog) {
				if(blog.id == req.params.id) {
					res.render('post',{blog:blog})
				}
			});
		}
	});
});

app.get('/new',function(req,res) {
	res.render('new');
});

app.post('/new',function(req,res) {
	fs.readFile('blog.json',function(err, data) {
		if(err) {
			res.sendStatus(500);
		} else {

			const jsonData = JSON.parse(data.toString());
			const date = new Date();
			const newPost = {
				id:Math.floor(Math.random()*1000)+"_"+date.getTime(),
				title:req.body.title,
				content:req.body.content
			};
			jsonData.blogs.push(newPost);

			fs.writeFile('blog.json',JSON.stringify(jsonData),function(err) {
				if(err) {
					console.log(err);
					res.sendStatus(500);
				}
				res.redirect('/');
			});

			
		}
	});
});

app.listen(port);