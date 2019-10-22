//Require node packages 
let express = require('express');
let handlebars = require('express-handlebars');
//let logger = require('morgan');
let mongoose = require('mongoose');
let axios = require('axios');
let cheerio = require('cheerio');


//Require the models from my models folder
let db = require('./models');

//connection to port
const PORT = 8080;

//Initialize Express
let app = express();

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
    axios.get('https://medium.com/topic/programming').then(function (response) {
        //loan into cheerio and save it into a shorthand selector of $
        let $ = cheerio.load(response.data);
        //create an empty array to save the data to be scraped
        let results = [];

        $('div h3').each(function (i, element) {

            results.title = $(this)
                .children('a')
                .text();
            results.link = $(this)
                .children('a')
                .attr('href');

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
    db.Article.find({})
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route to get a specific article by id and populate it with a note


//Route to save/update the article's note


//start server
app.listen(PORT, function () {
    console.log(`App running on http://localhost:${PORT}`)
})
