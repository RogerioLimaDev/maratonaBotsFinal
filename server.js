var restify = require('restify');
var consign = require('consign');

var app = restify.createServer();   

consign()
    .include('./mongo.js')
    .then('./cadastro.json')
    .into(app);

module.exports = app;