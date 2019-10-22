//Require node packages 
const express = require('express');
const handlebars = require('express-handlebars');
//const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');


//Require the models from my models folder
const db = require('./models');

//connection to port
const PORT = 8080;

//Initialize Express
const app = express();

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
app.get('/scrape', function (req, res) {
    //grab body of HTML using axios
    axios.get('https://www.sciencedaily.com/news/computers_math/computer_programming/').then(function (response) {
        //loan into cheerio and save it into a shorthand selector of $
        const $ = cheerio.load(response.data);
        //create an empty array to save the data to be scraped
        // const className = $('.latest-head');
        // const output = className.children('a').text();
        // const link = className.children('a').attr('href');
        // console.log(output);




        $('.latest-head').each(function (i, element) {

            let result = [];

            result.title = $(this)
                .children('a')
                .text();
            //console.log(result.title);
            result.link = $(this)
                .children('a')
                .attr('href');
            console.log(result.title + result.link);

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        res.send("Scrape Complete");
    });
});


//Route to get the articles form the db
app.get('articles', function (req, res) {
    //grab all the documents in the Articles collection
    db.Article.find({})
        .then(function (dbArticle) {
            //send back the articles found to the client
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route to get a specific article by id and populate it with a note
app.get('/articles/:id', function (req, res) {

})

//Route to save/update the article's note
app.post('/articles/:id', function (req, res) {

})

//start server
app.listen(PORT, function () {
    console.log(`App running on http://localhost:${PORT}`)
})
