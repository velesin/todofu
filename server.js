#!/bin/env node

"use strict"

var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;
var ipAddress = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.listen(port, ipAddress, function() {
  console.log('%s: ToDoFu started on %s:%d', Date(Date.now() ), ipAddress, port);
});
