//Require node packages 
var express = require('express');
var handlebars = require('express-handlebars');
//var logger = require('morgan');
var mongoose = require('mongoose');
var axios = require('axios');
var cheerio = require('cheerio');


//Require the models from my models folder
var db = require('./models');

//connection to port
var PORT = 8080;

//Initialize Express
var app = express();

//Use morgan logger for logging requests
//app.use(logger('dev'));

//Parse the request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//Connect to Mongo DB
mongoose.connect('mongodb://localhost/articledb', { useNewUrlParser: true });

//Routes
//GET route to scrap website of choice


//Route to get the articles form the db


//Route to get a specific article by id and populate it with a note


//Route to save/update the article's note


//start server
app.listen(PORT, function () {
    console.log(`App running on http://localhost:${PORT}`)
})
