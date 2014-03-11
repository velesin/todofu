#!/bin/env node

"use strict"

var express = require('express');
var app = express();

var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy(
  {
    returnURL: 'http://todofu.com/login',
    realm: 'http://todofu.com/'
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

app.use(express.cookieParser());
app.use(express.session({ secret: 'tdftdftdf' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(__dirname + '/public'));

var ensureAuthenticated = function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.send(401);
  }
  next();
}

app.get('/', function(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login');
  }
  next();
});

var loginMiddleware;
if (process.env.NODE_ENV == 'test') {
  loginMiddleware = function(req, res, next) {
    req.login({name: 'Wojtek', id: 'test'}, function() {
      next();
    });
  };
} else {
  loginMiddleware = passport.authenticate('google');
}

app.get('/login', loginMiddleware, function(req, res, next) {
  return res.redirect('/');
});

app.get('/logout', function(req, res) {
  req.logout();
  res.send('Logged out');
});

//app.get('/user', function(req, res) {
//  if (req.user) {
//    res.send(req.user);
//  } else {
//    res.send('Not logged in');
//  }
//});

app.get('/somethings/:id', function(req, res){
  res.send({
    something: {
      id: 1,
      hello: 'Hello from API'
    }
  });
});

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(port, ipAddress, function() {
  console.log('%s: ToDoFu started on %s:%d', Date(Date.now() ), ipAddress, port);
});
