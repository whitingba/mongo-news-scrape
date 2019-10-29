//Require node packages 
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const axios = require('axios');
const cheerio = require('cheerio');


//Require the models from my models folder
const db = require('./models');

//connection to port
const PORT = 8060;

//Initialize Express
const app = express();

//Use morgan logger for logging requests
app.use(logger('dev'));

//Parse the request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

//set handlebars
const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

//Connect to Mongo DB
mongoose.connect('mongodb://localhost/articledb', { useNewUrlParser: true });

//Routes


app.get("/", function (req, res) {
    db.Article.find({}, null, function (err, data) {
        if (data.length === 0) {
            res.render('message', { message: "Hit the scrape button above to see fresh news!" });
        }
        else {
            res.render('index', { articles: data });
        }
    });
});


//GET route to scrap website of choice
app.get('/scrape', function (req, res) {
    //grab body of HTML using axios
    axios.get('https://www.sciencedaily.com/news/computers_math/computer_programming/').then(function (response) {
        //loan into cheerio and save it into a shorthand selector of $
        const $ = cheerio.load(response.data);


        $('.latest-head').each(function (i, element) {
            //create an empty object to save the data to be scraped
            var result = {};

            result.title = $(this)
                .children('a')
                .text();
            //console.log(result.title);
            result.link = $(this)
                .children('a')
                .attr('href');

            // console.log(result.title + result.link);

            db.Article.create(result)
                .then(function (dbArticle) {
                    console.log(dbArticle);
                })
                .catch(function (err) {
                    console.log(err);
                });
        });
        console.log("Scrape Complete");
        res.redirect('/');
    });
});



//Route to view all the saved articles
app.get('/save', function (req, res) {
    db.Article.find({ issaved: true }, null, function (err, data) {
        if (data.length === 0) {
            res.render('message', { message: "Try saving some articles first, then come back" });
        }
        else {
            res.render('saved', { saved: data });
        }
    });
});

//Route to get a specific article by id and populate it with a note
app.get('/save/:id', function (req, res) {
    // query that finds the matching id in our mongo database
    db.Article.findOne({ _id: req.params.id })
        //populate all the notes that are associated with the article 
        .populate('note')
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        });
});

//Route to save/update the article's note
app.post('/articles/:id', function (req, res) {
    //create a new note and pass the req.body to the note entry
    db.Note.create(req.body)
        .then(function (dbNote) {
            return db.Article.findOneAndUpdate({ _id: req.params.id }, { note: dbNote._id }, { new: true });
        })
        .then(function (dbArticle) {
            res.json(dbArticle);
        })
        .catch(function (err) {
            res.json(err);
        })

})

app.get('/clear', function (req, res) {
    db.Article.deleteMany({}, function (error, response) {
        if (error) {
            console.log(error);
            res.send(error);
        }
        else {
            res.send(response);
        }
    });
});

//start server
app.listen(PORT, function () {
    console.log(`App running on http://localhost:${PORT}`)
})