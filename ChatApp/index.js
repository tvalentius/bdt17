const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const session = require('express-session');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 1337;
const fs = require('fs');
// Auth
const passport = require('passport');
const FacebookStrategy = require('passport-facebook');
// db
const datastore = require('nedb');

const blogs = new datastore({filename: './db-blogs', autoload: true});
const products = new datastore({filename: './db-products', autoload: true});


let sessionMid = session({
  secret:'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: {
    secure: false
  }
});

io.use(function(socket, next) {
  sessionMid(socket.request, socket.request.res, next);
});
app.use(sessionMid);

//app.use(express.bodyParser());
app.use(passport.initialize());
app.use(passport.session());

passport.use(new FacebookStrategy({
  clientID:'866001593538241',
  clientSecret:'e762c0c4596e4fac1e93ab439d6f1be8',
  callbackURL:'http://localhost:1337/auth/facebook/callback'
},function(accessToken, refreshToken, profile, cb) {
  console.log('Facebook Auth :',profile);
  return cb(null,profile);
}));

passport.serializeUser(function(user, done) {
  done(null,user);
});

passport.deserializeUser(function(user, done) {
  done(null,user);
});

function checkAuthenticate(req, res, next) {
  if(req.isAuthenticated()) {
    next();
  } else {
    res.send('<a href="/auth/facebook/">login</a>');
  }
}

// Serve Static HTML
app.get('/',checkAuthenticate,function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.get('/auth/facebook',passport.authenticate('facebook'));
app.get('/auth/facebook/callback',
  passport.authenticate('facebook',{
    failureRedirect:'/login'
  }),function(req, res) {
    res.redirect('/');
});

app.get('/session',function(req, res) {
  let sess = req.session;
  console.log(sess);
  if(req.isAuthenticated()) {
    res.redirect("/");
  } else {
    res.redirect("/auth/facebook");
  }
});

app.get('/insert',function(req,res) {
  blogs.insert([{ title:req.query.title}],function(err) {
    res.send('data saved');
  })
})

app.get('/blog', function(req, res) {
  blogs.find({}, function(err,docs) {
    res.send(docs);
  })
})

// auth


// open connection
io.on('connection', function(socket) {

  console.log('a user connected');

  socket.on('disconnect', function() {
    console.log('user disconnected');
  });

  socket.on('chat message', function(msg) {
    console.log('message: ',msg);

    let sess = socket.request.session.passport;
    let newMsg = sess.user.displayName + ' : '+msg;

    if(msg == '/blogs') {
      blogs.find({}, function(err,docs) {
        io.emit('chat message', JSON.stringify(docs));
      })
      return;
    }
    io.emit('chat message',newMsg);
  });
})

// Database CRUD


// Run node server
http.listen(port, function() {
  console.log('listening on port :',port);
});
